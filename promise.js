function greeting(name) {
  alert('Hello ' + name);
}

function processUserInput(callback) {
  var name = prompt('Please enter your name.');
  callback(name);
}

processUserInput(greeting);


let getText = function(cb) {
    /* Get the text field */
    let textArea = document.getElementById('textArea');
    cb(textArea);
};

let copyText = function(textArea) {
    /* Select the text field */
    copyText.select();

    /* Copy the text inside the text field */
    document.execCommand('copy');

    /* Alert the copied text */
    alert('Copied the text: ' + copyText.value);
};

getText();
// let copyToClipboard = function() {
//   /* Get the text field */
//   let copyText = document.getElementById('textArea');
//
//   /* Select the text field */
//   copyText.select();
//
//   /* Copy the text inside the text field */
//   document.execCommand('copy');
//
//   /* Alert the copied text */
//   alert('Copied the text: ' + copyText.value);
// };
//
