/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


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
  readonly content : string;
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


/** Stumpfi entities register type declaration. */
interface Entities {
  pages : {
    [key : string] : Page;
  };
  resources : {
    [key : string] : Resource;
  };
  components : {
    [key : string] : Component;
  };
  contents : {
    [key : string] : Content;
  };
}


/**
 * Converts a stumpfi-encoded HTML document back to a stumpfi Document instance.
 * @param {string} htmlDocument The HTML document to convert.
 * @returns {Document} The new stumpfi Document instance.
 * @throws Throws an Error if the input is not a valid stumpfi HTML document.
 */
export default function fromHTML(htmlDocument : string) : Document {
  // Stumpfi entities register.
  const entities : Entities = {
    contents: {},
    components: {},
    resources: {},
    pages: {},
  };


  // This regexp helps us to extract the JSON declaration from the HTML document.
  const jsonRegexp : RegExp = /\<body><div style="visibility: hidden;">{(.*)}<\/div>\<\/body>/;
  const jsonDocument : RegExpExecArray | null = jsonRegexp.exec(htmlDocument);
  if (jsonDocument === null) {
    throw new Error('Input string is not a valid stumpfi HTML document.');
  }
  const jsonEntities : JsonEntities = JSON.parse(`{${jsonDocument[1]}}`);


  // Fills the register with a new stumpfi Content instance retrieved from a JSON content.
  const jsonToContent : (contentId : string) => Content = (contentId) => {
    if (entities.contents[contentId] === undefined) {
      entities.contents[contentId] = new Content(jsonEntities.contents[contentId].html);
    }
    return entities.contents[contentId];
  };


  // Fills the register with a new stumpfi Component instance retrieved from a JSON component.
  const jsonToComponent : (componentId : string) => Component = (componentId) => {
    if (entities.components[componentId] === undefined) {
      entities.components[componentId] = new Component(
        jsonToContent(jsonEntities.components[componentId].content),
      );
      entities.components[componentId].setClassName(jsonEntities.components[componentId].className);
      entities.components[componentId].setStyle(jsonEntities.components[componentId].style);
    }
    return entities.components[componentId];
  };


  // Fills the register with a new stumpfi Resource instance retrieved from a JSON resource.
  const jsonToResource : (resourceId : string) => Resource = (resourceId) => {
    if (entities.resources[resourceId] === undefined) {
      const jsonResource : JsonResource = jsonEntities.resources[resourceId];
      entities.resources[resourceId] = new Resource(jsonResource.type);
      entities.resources[resourceId].setContent(jsonResource.content);
      Object.keys(jsonResource.attributes).forEach((attribute) => {
        entities.resources[resourceId].setAttribute(attribute, jsonResource.attributes[attribute]);
      });
    }
    return entities.resources[resourceId];
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

  return document;
}
