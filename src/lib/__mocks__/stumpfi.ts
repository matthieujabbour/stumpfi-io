/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


/* tslint:disable max-classes-per-file prefer-function-over-method */


/**
 * Mocked entities instances.
 */
const resource1 : object = {
  getId: jest.fn(() => 'resource1'),
  getType: jest.fn(() => 'link'),
  getContent: jest.fn(() => ''),
  getAttributes: jest.fn(() => ({ charset: 'UTF-8', boolAttribute: true })),
};
const resource2 : object = {
  getId: jest.fn(() => 'resource2'),
  getType: jest.fn(() => 'style'),
  getContent: jest.fn(() => 'body { background: blue; }'),
  getAttributes: jest.fn(() => ({ charset: 'UTF-8' })),
};
const resource3 : object = {
  getId: jest.fn(() => 'resource3'),
  getType: jest.fn(() => 'script'),
  getContent: jest.fn(() => 'var p = 2;'),
  getAttributes: jest.fn(() => ({ boolAttribute: false })),
};
const resource4 : object = {
  getId: jest.fn(() => 'resource4'),
  getType: jest.fn(() => 'style'),
  getContent: jest.fn(() => null),
  getAttributes: jest.fn(() => ({})),
};
const resource5 : object = {
  getId: jest.fn(() => 'resource5'),
  getType: jest.fn(() => 'script'),
  getContent: jest.fn(() => null),
  getAttributes: jest.fn(() => ({})),
};
const template1 : object = {
  getId: jest.fn(() => 'template1'),
  getResources: jest.fn(() => [resource3]),
  getCode: jest.fn(() => '<p>{{RICH_TEXT}}</p><ul><li>{{SIMPLE_TEXT}}</li></ul>'),
};
const content1 : object = {
  getId: jest.fn(() => 'content1'),
  getType: jest.fn(() => 'RICH_TEXT'),
  getMarkupText: jest.fn(() => 'test content 1'),
};
const content2 : object = {
  getId: jest.fn(() => 'content2'),
  getType: jest.fn(() => 'SIMPLE_TEXT'),
  getMarkupText: jest.fn(() => 'test content 2'),
};
const content3 : object = {
  getId: jest.fn(() => 'content3'),
  getType: jest.fn(() => 'SIMPLE_TEXT'),
  getMarkupText: jest.fn(() => ''),
};
const content4 : object = {
  getId: jest.fn(() => 'content4'),
  getType: jest.fn(() => 'SIMPLE_TEXT'),
  getMarkupText: jest.fn(() => ''),
};
const content5 : object = {
  getId: jest.fn(() => 'content5'),
  getType: jest.fn(() => 'SIMPLE_TEXT'),
  getMarkupText: jest.fn(() => ''),
};
const component1 : object = {
  getId: jest.fn(() => 'component1'),
  getTemplate: jest.fn(() => template1),
  getContents: jest.fn(() => [content1, content3, content4, content2]),
  getCoordinates: jest.fn(() => ({ x: 50, y: 64 })),
  getDimensions: jest.fn(() => ({ w: 12, h: 7 })),
};
const component2 : object = {
  getId: jest.fn(() => 'component2'),
  getTemplate: jest.fn(() => template1),
  getContents: jest.fn(() => [content5, content1]),
  getCoordinates: jest.fn(() => ({ x: 32, y: 21 })),
  getDimensions: jest.fn(() => ({ w: 85, h: 65 })),
};
const page1 : object = {
  getId: jest.fn(() => 'page1'),
  getResources: jest.fn(() => [resource1]),
  getMaster: jest.fn(() => null),
  getComponents: jest.fn(() => [component1]),
};
const page2 : object = {
  getId: jest.fn(() => 'page2'),
  getResources: jest.fn(() => [resource2]),
  getMaster: jest.fn(() => page1),
  getComponents: jest.fn(() => [component2]),
};
const page3 : object = {
  getId: jest.fn(() => 'page3'),
  getResources: jest.fn(() => []),
  getMaster: jest.fn(() => null),
  getComponents: jest.fn(() => [component2]),
};


/**
 * These objects are used to simulate new instances declarations.
 */
const content : object = {};
const resource : object = {
  setContent: jest.fn(),
  setAttribute: jest.fn(),
};
const template : object = {
  addResource: jest.fn(),
  setCode: jest.fn(),
};
const component : object = {
  setCoordinates: jest.fn(),
  setDimensions: jest.fn(),
  setTemplate: jest.fn(),
  setContentAt: jest.fn(),
};
const page : object = {
  addResource: jest.fn(),
  addComponent: jest.fn(),
  setMaster: jest.fn(),
};
const document : object = {
  getId: jest.fn(() => 'document1'),
  getName: jest.fn(() => 'test name'),
  getDescription: jest.fn(() => 'test description'),
  getResources: jest.fn(() => [resource1, resource2, resource3, resource4, resource5]),
  getTags: jest.fn(() => ['tag1', 'tag2']),
  getAuthors: jest.fn(() => ['author1', 'author2']),
  getPages: jest.fn(() => [page2, page2, page3]),
  addAuthor: jest.fn(),
  addTag: jest.fn(),
  addResource: jest.fn(),
  addPage: jest.fn(),
};


export const Document : jest.Mock<object> = jest.fn(() => document);
export const Resource : jest.Mock<object> = jest.fn(() => resource);
export const Page : jest.Mock<object> = jest.fn(() => page);
export const Component : jest.Mock<object> = jest.fn(() => component);
export const Template : jest.Mock<object> = jest.fn(() => template);
export const Content : jest.Mock<object> = jest.fn(() => content);
export const ContentTypes : object = { SIMPLE_TEXT: 'SIMPLE_TEXT' };
