/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


const specialCharsMap = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#039;': '\'',
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '\'': '&#039;',
};

const replacer = match => specialCharsMap[match];


/**
 * Unescapes a text previously escaped with `escape`.
 * @param {string} text Text to unescape.
 * @returns {string} The unescaped text.
 */
function unescape(text) {
  return text.replace(/(&amp;|&lt;|&gt;|&quot;|&#039;)/g, replacer);
}


/**
 * Escapes HTML special characters of a text to prevent interpreting it as HTML.
 * @param {string} text Text to escape.
 * @returns {string} The escaped text.
 */
function escape(text) {
  return text.replace(/[&<>"']/g, replacer);
}


/**
 * Rendering functions for each content type.
 */
const contentTypesRenderers = {
  SIMPLE_TEXT: content => content,
  RICH_TEXT: content => content,
  MEDIA: content => content,
};


window.onload = function() {
  const jsonEntities = JSON.parse(unescape(document.body.childNodes[0].innerHTML));
  let parseError = false;


  /**
   * Transforms a camelCase prop into a HTML attribute.
   * @param {string} camelCase The camelCase prop to transform.
   * @returns {string} The HTML attribute.
   */
  const camelCaseToAttribute = camelCase => (
    camelCase.replace(/([A-Z])/g, '-$1').toLowerCase()
  );


  /**
   * Renders a resource into an HTML tag.
   * @param {JsonResource} data The resource to render.
   * @returns {string} The rendered HTML tag.
   */
  const renderResource = (data) => {
    const dataAttributes = data.attributes;
    const attributes = Object.keys(dataAttributes).reduce((str, attribute) => (
      (typeof dataAttributes[attribute] === 'string')
        ? `${str} ${camelCaseToAttribute(attribute)}="${dataAttributes[attribute]}"`
        : (dataAttributes[attribute] === true) ? `${str} ${camelCaseToAttribute(attribute)}` : str
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
   * Renders a component into an HTML tag.
   * @param {JsonComponent} data The component to render.
   * @returns {string} The rendered HTML tag.
   */
  const renderComponent = (data) => {
    const style = (
      `position: absolute;` +
      `width: ${data.dimensions.w}%;` +
      `height: ${data.dimensions.h}%;` +
      `top: ${data.coordinates.y}%;` +
      `left: ${data.coordinates.x}%;`
    );

    const replacer = (() => {
      let index = 0;
      return (match, pattern) => {
        // No associated content...
        if (data.contents[index] === null || data.contents[index] === undefined) {
          ++index;
          return '';
        }

        if (pattern !== jsonEntities.contents[data.contents[index]].type) {
          console.warn(`Content #${data.contents[index]}'s type is not compatible with ${pattern}.`);
          parseError = true;
        }
        const escapedContent = escape(jsonEntities.contents[data.contents[index++]].markupText);
        return contentTypesRenderers[pattern](escapedContent);
      };
    })();

    const template = jsonEntities.templates[data.template];
    const hydratedTemplate = template.code.replace(/\{\{(RICH_TEXT|SIMPLE_TEXT|MEDIA)\}\}/g, replacer);
    return `<div style="${style}">${hydratedTemplate}</div>`
  };


  /**
   * Renders a page into an HTML tag.
   * @param {JsonPage} data The page to render.
   * @returns {string} The rendered HTML tag.
   */
  const renderPage = (data) => {
    const htmlComponents = [];
    // Declaring resources list as an object with unique keys helps to insert each resource
    // only once.
    const htmlResources = {};

    // This script is used to automatically scale page's font size to its width.
    htmlResources['autoresizeScript'] = renderResource({
      type: 'script',
      attributes: { type: 'text/javascript' },
      content: 'function scale() {' +
        'const fontSize = Math.min(16/9 * window.innerHeight / 100, window.innerWidth / 100);' +
        'document.body.style.fontSize = `${fontSize}px`;' +
      '}' +
      'window.addEventListener(\'resize\', scale); window.onload = scale;',
    });
 
    // This style is used to automatically scale page's dimensions to frame size,
    // keeping the specified ratio.
    htmlResources['autoresizeStyle'] = renderResource({
      type: 'style',
      attributes: { type: 'text/css' },
      content: 'div[data-component-id]{overflow: auto; position: absolute;}' +
      'body{width: calc(16/9 * 100vh); height: calc(9/16 * 100vw); max-width: 100vw;' +
      'max-height: 100vh; position: relative; margin: 0;}',
    });

    let page = data;
    while (page !== null) {
      page.resources.forEach((resourceId) => {
        htmlResources[resourceId] = renderResource(jsonEntities.resources[resourceId]);
      });
      page.components.forEach((componentId) => {
        htmlComponents.unshift(renderComponent(jsonEntities.components[componentId]));
        // Adding each page template's resource to the page...
        const templateId = jsonEntities.components[componentId].template;
        jsonEntities.templates[templateId].resources.forEach((resourceId) => {
          htmlResources[resourceId] = renderResource(jsonEntities.resources[resourceId]);
        });
      });
      page = (page.master === null) ? null : jsonEntities.pages[page.master];
    }
    const srcDoc = (
      `<!DOCTYPE html>` +
      `<html>` +
        `<head>` +
          `${Object.keys(htmlResources).map(resourceId => htmlResources[resourceId]).join('')}` +
        `</head>` +
        `<body>` +
          `${htmlComponents.join('')}` +
        `</body>` +
      `</html>`
    );

    return `<iframe srcDoc="${escape(srcDoc)}" class="stumpfi page"></iframe>`;
  };


  let innerHTML = '';
  Object.keys(jsonEntities.documents).forEach((documentId) => {
    jsonEntities.documents[documentId].pages.forEach((pageId) => {
      innerHTML += renderPage(jsonEntities.pages[pageId]);
    });
    document.body.innerHTML = innerHTML;
  });

  if (parseError === true) {
    console.error('One or many errors occured during document rendering. This may affect displaying.');
  }
};
