$(document).ready(function() {
  $('.convert-btn').click(function() {
    $.ajax({
      type: 'POST',
      url: 'convert-case',
      data: {
        text: $('#textArea').val(),
        caseType: $(this).val(),
      },
      success: function(response) {
        $('#textArea').val(response.text);
      },
    });
  });

  // Copies text when 'Copy' button is clicked.
  $('#copy-btn').click(function() {
    /* Get the text field */
    let copyText = document.getElementById('textArea');

    /* Select the text field */
    copyText.select();

    /* Copy the text inside the text field */
    document.execCommand('copy');

    /* Alert the copied text */
    alert('Copied the text!');
  });
});

// let copyText = function(textArea) {
//     /* Select the text field */
//     textArea.select();
//
//     /* Copy the text inside the text field */
//     document.execCommand('copy');
//
//     /* Alert the copied text */
//     alert('Copied the text: ' + textArea.value);
// };
//
// let getText = function(cb) {
//     /* Get the text field */
//     let textArea = document.getElementById('textArea');
//     cb(textArea);
// };


// Todo: Figure out how to run copyToClipboard synchronously after ajax.
// Needs to execute execCommand AFTER getting copyText.
// $(document).ajaxStop( function() {
//     copyToClipboard();
// });


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
