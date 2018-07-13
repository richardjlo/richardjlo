$(document).ready(function() {
  // Enable tooltips
  $(function() {
    $('[data-toggle="tooltip"]').tooltip();
  });

  // When any of the convert buttons are clicked, convert text.
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

  // // Copies text when 'Copy' button is clicked.
  // $('#copy-btn').click(function() {
  //   /* Get the text field */
  //   let copyText = document.getElementById('textArea');
  //
  //   /* Select the text field */
  //   copyText.select();
  //
  //   /* Copy the text inside the text field */
  //   document.execCommand('copy');
  //
  //   /* Update tooltip */
  //   let originalText = $('#copy-btn').attr('data-original-title');
  //   $('#copy-btn').attr('data-original-title', 'Copied!').tooltip('show');
  //   $('#copy-btn').attr('data-original-title', originalText);
  // });

});
