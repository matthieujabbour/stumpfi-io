/**
 * Copyright 2017 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import { Component, Content, Document, Page, Resource, Template } from 'stumpfi';
import { Entities, JsonComponent, JsonEntities, JsonResource } from '../types';
import unescape from '../utils/unescape';


/**
 * Converts a stumpfi-encoded HTML document back to a stumpfi Document instance.
 * @param {string} htmlDocument The HTML document to convert.
 * @returns {Document} The new stumpfi Document instance.
 * @throws Throws an Error if the input is not a valid stumpfi HTML document.
 */
export default function fromHTML(htmlDocument : string) : Document {
  // Stumpfi entities register.
  const entities : Entities = {
    pages: {},
    resources: {},
    components: {},
    contents: {},
    templates: {},
  };


  try {
    // This regexp helps us to extract the JSON declaration from the HTML document.
    const jsonRegexp : RegExp = /<body><div style=\\"display: none;\\">{(.*)}<\/div><\/body>/i;
    const jsonDocument : RegExpExecArray | null = jsonRegexp.exec(htmlDocument);
    if (jsonDocument === null) {
      throw new Error('Input string is not a valid stumpfi HTML document.');
    }

    const jsonEntities : JsonEntities = JSON.parse(`{${unescape(jsonDocument[1])}}`);


    // Fills the register with a new stumpfi Content instance retrieved from a JSON content.
    const jsonToContent : (contentId : string) => Content = (contentId) => {
      if (entities.contents[contentId] === undefined) {
        entities.contents[contentId] = new Content(
          jsonEntities.contents[contentId].type,
          jsonEntities.contents[contentId].markupText,
        );
        entities.contents[contentId].setId(contentId);
      }
      return entities.contents[contentId];
    };


    // Fills the register with a new stumpfi Resource instance retrieved from a JSON resource.
    const jsonToResource : (resourceId : string) => Resource = (resourceId) => {
      if (entities.resources[resourceId] === undefined) {
        const jsonResource : JsonResource = jsonEntities.resources[resourceId];
        entities.resources[resourceId] = new Resource(jsonResource.type);
        if (jsonResource.content !== null) {
          entities.resources[resourceId].setContent(jsonResource.content);
        }
        Object.keys(jsonResource.attributes).forEach((attr) => {
          entities.resources[resourceId].setAttribute(attr, jsonResource.attributes[attr]);
        });
        entities.resources[resourceId].setId(resourceId);
      }
      return entities.resources[resourceId];
    };


    // Fills the register with a new stumpfi Template instance retrieved from a JSON template.
    const jsonToTemplate : (templateId : string) => Template = (templateId) => {
      if (entities.templates[templateId] === undefined) {
        entities.templates[templateId] = new Template(jsonEntities.templates[templateId].code);
        jsonEntities.templates[templateId].resources.forEach((resource) => {
          entities.templates[templateId].addResource(jsonToResource(resource));
        });
        entities.templates[templateId].setId(templateId);
      }
      return entities.templates[templateId];
    };


    // Fills the register with a new stumpfi Component instance retrieved from a JSON component.
    const jsonToComponent : (componentId : string) => Component = (componentId) => {
      if (entities.components[componentId] === undefined) {
        const jsonComponent : JsonComponent = jsonEntities.components[componentId];
        entities.components[componentId] = new Component();
        entities.components[componentId].setCoordinates(jsonComponent.coordinates);
        entities.components[componentId].setDimensions(jsonComponent.dimensions);
        entities.components[componentId].setTemplate(jsonToTemplate(jsonComponent.template));
        jsonComponent.contents.forEach((content, index) => {
          if (content !== null) {
            entities.components[componentId].setContentAt(index, jsonToContent(content));
          }
        });
        entities.components[componentId].setId(componentId);
      }
      return entities.components[componentId];
    };


    // Fills the register with a new stumpfi Page instance retrieved from a JSON page.
    const jsonToPage : (pageId : string) => Page = (pageId) => {
      if (entities.pages[pageId] === undefined) {
        entities.pages[pageId] = new Page();
        if (jsonEntities.pages[pageId].master !== null) {
          entities.pages[pageId].setMaster(jsonToPage(jsonEntities.pages[pageId].master as string));
        }
        jsonEntities.pages[pageId].resources.forEach((resource) => {
          entities.pages[pageId].addResource(jsonToResource(resource));
        });
        jsonEntities.pages[pageId].components.forEach((component) => {
          entities.pages[pageId].addComponent(jsonToComponent(component));
        });
        entities.pages[pageId].setId(pageId);
      }
      return entities.pages[pageId];
    };


    // Building the stumpfi Document instance...
    const documentId : string = Object.keys(jsonEntities.documents)[0];
    const document : Document = new Document(
      jsonEntities.documents[documentId].name,
      jsonEntities.documents[documentId].description,
    );
    jsonEntities.documents[documentId].authors.forEach((author) => {
      document.addAuthor(author);
    });
    jsonEntities.documents[documentId].tags.forEach((tag) => {
      document.addTag(tag);
    });
    jsonEntities.documents[documentId].resources.forEach((resource) => {
      document.addResource(jsonToResource(resource));
    });
    jsonEntities.documents[documentId].pages.forEach((pageId) => {
      document.addPage(jsonToPage(pageId));
    });
    document.setId(documentId);
    return document;
  } catch (error) {
    throw new Error(`Given input is not a valid stumpfi HTML document (${error.message}).`);
  }
}
