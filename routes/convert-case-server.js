module.exports.lower = function(text) {
  return text.toLowerCase();
};

module.exports.upper = function(text) {
  return text.toUpperCase();
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
  for (let i = 0; i < text.length; i++) {
    // if (text.indexOf('.') != -1) {
    //
    // }
  };

  return text.join(' ');

};
