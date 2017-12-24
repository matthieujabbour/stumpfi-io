/**
 * Copyright 2016 - present, Matthieu Jabbour <matthieu.jabbour@gmail.com>.
 * All rights reserved.
 */


const specialCharsMap : { [key : string] : string } = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#039;': '\'',
};

const replacer : (match : string) => string = match => specialCharsMap[match];


/**
 * Unescapes a text previously escaped with `escape`.
 * @param {string} text Text to unescape.
 * @returns {string} The unescaped text.
 */
export default function unescape(text : string) : string {
  return text.replace(/(&amp;|&lt;|&gt;|&quot;|&#039;)/g, replacer);
}
