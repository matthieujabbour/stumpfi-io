/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import * as fs from 'fs-extra';
import * as path from 'path';
import { Component, Content, Document, Page, Resource } from 'stumpfi';


/** CSS properties type definition. */
interface CssProperties {
  [x : string] : string;
}


/** Resource attributes list type declaration. */
interface Attributes {
  [key : string] : string | boolean;
}


/** JSON-formatted stumpfi content type declaration. */
interface JsonContent {
  readonly html : string;
}


/** JSON-formatted stumpfi component type declaration. */
interface JsonComponent {
  readonly content : string;
  readonly className : string;
  readonly style : CssProperties;
}


/** JSON-formatted stumpfi resource type declaration. */
interface JsonResource {
  readonly type : string;
  readonly content : string | null;
  readonly attributes : Attributes;
}


/** JSON-formatted stumpfi page type declaration. */
interface JsonPage {
  readonly master : string | null;
  readonly components : string[];
  readonly resources : string[];
}


/** JSON-formatted stumpfi document type declaration. */
interface JsonDocument {
  readonly name : string;
  readonly authors : string[];
  readonly description : string;
  readonly tags : string[];
  readonly resources : string[];
  readonly pages : string[];
}


/** JSON-formatted stumpfi entities register type declaration. */
interface JsonEntities {
  documents : {
    [key : string] : JsonDocument;
  };
  pages : {
    [key : string] : JsonPage;
  };
  resources : {
    [key : string] : JsonResource;
  };
  components : {
    [key : string] : JsonComponent;
  };
  contents : {
    [key : string] : JsonContent;
  };
}


/** Path to the stumpfi-renderer JS script. */
const stumpfiRendererFilePath : string = path.resolve(__dirname, '../renderer/stumpfi-renderer.min.js');


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
  };


  // Fills the register with a JSON content generated from a stumpfi Content instance.
  const contentToJson : (content : Content) => string = (content) => {
    if (jsonEntities.contents[content.getId()] === undefined) {
      jsonEntities.contents[content.getId()] = {
        html: content.getHtml(),
      };
    }
    return content.getId();
  };


  // Fills the register with a JSON component generated from a stumpfi Component instance.
  const componentToJson : (component : Component) => string = (component) => {
    if (jsonEntities.components[component.getId()] === undefined) {
      jsonEntities.components[component.getId()] = {
        content: contentToJson(component.getContent()),
        className: component.getClassName(),
        style: component.getStyle(),
      };
    }
    return component.getId();
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


  // Fills the register with a JSON page generated from a stumpfi Page instance.
  const pageToJson : (page : Page) => string = (page) => {
    if (jsonEntities.pages[page.getId()] === undefined) {
      jsonEntities.pages[page.getId()] = {
        master: (page.getMaster() !== null) ? pageToJson(page.getMaster() as Page) : null,
        components: page.getComponents(false).map(componentToJson),
        resources: page.getResources(false).map(resourceToJson),
      };
    }
    return page.getId();
  };


  const data : JsonDocument = {
    name: document.getName(),
    authors: document.getAuthors(),
    description: document.getDescription(),
    tags: document.getTags(),
    resources: document.getResources().map(resourceToJson),
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
        `<div style="visibility: hidden;">${JSON.stringify(jsonEntities)}</div>` +
      `</body>` +
    `</html>`
  );
}
