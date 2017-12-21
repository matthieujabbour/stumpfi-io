/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


import { Attributes, Component, Content, ContentTypes, Coordinates, Dimensions, Page, Resource, Template } from 'stumpfi';


/** JSON-formatted stumpfi resource type declaration. */
export interface JsonResource {
  readonly type : 'style' | 'script' | 'link';
  readonly content : string | null;
  readonly attributes : Attributes;
}


/** JSON-formatted stumpfi content type declaration. */
export interface JsonContent {
  readonly type : ContentTypes;
  readonly markupText : string;
}


/** JSON-formatted stumpfi template type declaration. */
export interface JsonTemplate {
  readonly resources : string[];
  readonly code : string;
}


/** JSON-formatted stumpfi component type declaration. */
export interface JsonComponent {
  readonly contents : string[];
  readonly coordinates : Coordinates;
  readonly dimensions : Dimensions;
  readonly template : string;
}


/** JSON-formatted stumpfi page type declaration. */
export interface JsonPage {
  readonly resources : string[];
  readonly master : string | null;
  readonly components : string[];
}


/** JSON-formatted stumpfi document type declaration. */
export interface JsonDocument {
  readonly resources : string[];
  readonly name : string;
  readonly description : string;
  readonly tags : string[];
  readonly authors : string[];
  readonly pages : string[];
}


/** JSON-formatted stumpfi entities register type declaration. */
export interface JsonEntities {
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
  templates : {
    [key : string] : JsonTemplate;
  };
}


/** Stumpfi entities register type declaration. */
export interface Entities {
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
  templates : {
    [key : string] : Template;
  };
}
