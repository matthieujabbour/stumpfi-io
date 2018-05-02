/**
 * Copyright 2017 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


const specialCharsMap : { [key : string] : string } = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '\'': '&#039;',
};

const replacer : (match : string) => string = match => specialCharsMap[match];


/**
 * Escapes HTML special characters of a text to prevent interpreting it as HTML.
 * @param {string} text Text to escape.
 * @returns {string} The escaped text.
 */
export default function escape(text : string) : string {
  return text.replace(/[&<>"']/g, replacer);
}
