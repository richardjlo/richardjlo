// Require to-title-case
require('../vendor/to-title-case-master/to-title-case.js');

module.exports.convertCase = function(text, caseType) {
  switch (caseType) {
    case 'sentence':
      return this.sentenceCase(text);
    case 'lower':
      return text.toLowerCase();
    case 'upper':
      return text.toUpperCase();
    case 'title':
      text = this.sentenceCase(text);
      return text.toTitleCase();
  }
};

module.exports.sentenceCase = function(text) {
  // Lowercase string
  text = text.toLowerCase();

  // Split string into array of strings
  text = text.split(' ');

  // Capitalize first letter of text.
  text[0] = text[0].charAt(0).toUpperCase() + text[0].slice(1);

  // For each word in text, if it has a '.', change the first letter of the
  // next word to upperCase.
  let cur;
  let next;
  for (let i = 0; i < text.length; i++) {
    cur = text[i];
    if (cur.includes('.') || cur.includes('!') || cur.includes('?')) {
      next = text[i + 1];

      // is not last word in text
      if (next) {
        text[i + 1] = next.charAt(0).toUpperCase() + next.slice(1);
      }
    } else if (cur == 'i') {
      text[i] = cur.charAt(0).toUpperCase();
    }
  }
  return text.join(' ');
};
