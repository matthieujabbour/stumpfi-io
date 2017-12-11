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
export function fromHTML(htmlDocument : string) : Document;


/**
 * Converts a stumpfi Document instance into a stumpfi-encoded HTML document.
 * @param {Document} document The stumpfi document to convert.
 * @returns {string} The stumpfi-encoded HTML document.
 */
export function toHTML(document : Document) : string;
