/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import * as fs from 'fs-extra';
import * as path from 'path';
import { Attributes, Component, Content, Document, Page, Resource, Template } from 'stumpfi';
import { JsonDocument, JsonEntities, JsonResource } from '../types';
import escape from '../utils/escape';


/** Path to the stumpfi-renderer JS script. */
const stumpfiRendererFilePath : string = path.resolve(__dirname, './stumpfi-renderer.min.js');


/**
 * Transforms a camelCase prop into a HTML attribute.
 * @param {string} camelCase The camelCase prop to transform.
 * @returns {string} The HTML attribute.
 */
const camelCaseToAttribute : (camelCase : string) => string = camelCase => (
  camelCase.replace(/([A-Z])/g, '-$1').toLowerCase()
);


/**
 * Renders a resource into an HTML tag.
 * @param {JsonResource} data The resource to render.
 * @returns {string} The rendered HTML tag.
 */
const renderResource : (data : JsonResource) => string = (data) => {
  const dataAttributes : Attributes = data.attributes;
  /** @todo false attribute */
  const attributes : string = Object.keys(dataAttributes).reduce((str, attribute) => (
    (typeof dataAttributes[attribute] === 'string')
      ? `${str} ${camelCaseToAttribute(attribute)}="${dataAttributes[attribute]}"`
      : `${str} ${camelCaseToAttribute(attribute)}`
  ), '').trim();

  switch (data.type) {
    case 'style':
      return `<style ${attributes}>${data.content || ''}</style>`;
    case 'script':
      return `<script ${attributes}>${data.content || ''}</script>`;
    default:
      return `<link ${attributes} />`;
  }
};


/**
 * Converts a stumpfi Document instance into a stumpfi-encoded HTML document.
 * @param {Document} document The stumpfi document to convert.
 * @returns {string} The stumpfi-encoded HTML document.
 */
export default function toHTML(document : Document) : string {
  // Stumpfi JSON-formatted entities register.
  const jsonEntities : JsonEntities = {
    documents: {},
    pages: {},
    resources: {},
    components: {},
    contents: {},
    templates: {},
  };


  // Fills the register with a JSON resource generated from a stumpfi Resource instance.
  const resourceToJson : (resource : Resource) => string = (resource) => {
    if (jsonEntities.resources[resource.getId()] === undefined) {
      jsonEntities.resources[resource.getId()] = {
        type: resource.getType(),
        content: resource.getContent(),
        attributes: resource.getAttributes(),
      };
    }
    return resource.getId();
  };


  // Fills the register with a JSON template generated from a stumpfi Template instance.
  const templateToJson : (template : Template) => string = (template) => {
    if (jsonEntities.templates[template.getId()] === undefined) {
      jsonEntities.templates[template.getId()] = {
        resources: template.getResources().map(resourceToJson),
        code: template.getCode(),
      };
    }
    return template.getId();
  };


  // Fills the register with a JSON content generated from a stumpfi Content instance.
  const contentToJson : (content : Content) => string = (content) => {
    if (jsonEntities.contents[content.getId()] === undefined) {
      jsonEntities.contents[content.getId()] = {
        type: content.getType(),
        markupText: content.getMarkupText(),
      };
    }
    return content.getId();
  };


  // Fills the register with a JSON component generated from a stumpfi Component instance.
  const componentToJson : (component : Component) => string = (component) => {
    if (jsonEntities.components[component.getId()] === undefined) {
      jsonEntities.components[component.getId()] = {
        contents: component.getContents().map(contentToJson),
        coordinates: component.getCoordinates(),
        dimensions: component.getDimensions(),
        template: templateToJson(component.getTemplate()),
      };
    }
    return component.getId();
  };


  // Fills the register with a JSON page generated from a stumpfi Page instance.
  const pageToJson : (page : Page) => string = (page) => {
    if (jsonEntities.pages[page.getId()] === undefined) {
      jsonEntities.pages[page.getId()] = {
        resources: page.getResources(false).map(resourceToJson),
        master: (page.getMaster() !== null) ? pageToJson(page.getMaster() as Page) : null,
        components: page.getComponents(false).map(componentToJson),
      };
    }
    return page.getId();
  };


  const data : JsonDocument = {
    resources: document.getResources().map(resourceToJson),
    name: document.getName(),
    description: document.getDescription(),
    tags: document.getTags(),
    authors: document.getAuthors(),
    pages: document.getPages().map(pageToJson),
  };
  jsonEntities.documents[document.getId()] = data;


  // Rendering the document...
  return (
    `<html>` +
      `<head>` +
        `<title>${data.name}</title>` +
        `<meta charSet="UTF-8" />` +
        `<meta name="viewport" content="width=device-width, initial-scale=1.0" />` +
        `<meta name="description" content="${data.description}" />` +
        `<meta name="keywords" content="${data.tags.join(' ')}" />` +
        `<meta name="author" content="${data.authors.join(', ')}" />` +
        `<script type="text/javascript" src="data:text/javascript;base64,${
          fs.readFileSync(stumpfiRendererFilePath).toString('base64')
        }"></script>` +
        `${data.resources.map(resource => renderResource(jsonEntities.resources[resource])).join('')}` +
        `<style type="text/css">.stumpfi.page{border: none;}</style>` +
        `<noscript>The document cannot be rendered because Javascript is currently not enabled on your browser.</noscript>` +
      `</head>` +
      `<body>` +
        `<div style="display: none;">${escape(JSON.stringify(jsonEntities))}</div>` +
      `</body>` +
    `</html>`
  );
}
