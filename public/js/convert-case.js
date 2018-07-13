$(document).ready(function() {
  // Enable tooltips
  $(function() {
    $('[data-toggle="tooltip"]').tooltip();
  });

  // Enable copy to clipboard functionality
  copyToClipboard();

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
});

let copyToClipboard = function() {
  let clipboard = new ClipboardJS('#copy-btn');

  clipboard.on('success', function(e) {
    // Update tooltip
    let originalText = $('#copy-btn').attr('data-original-title');
    $('#copy-btn').attr('data-original-title', 'Copied!').tooltip('show');
    $('#copy-btn').attr('data-original-title', originalText);
  });

  clipboard.on('error', function(e) {
      console.error('Action:', e.action);
      console.error('Trigger:', e.trigger);
  });
};
