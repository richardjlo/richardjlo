$(document).ready(function() {
  initJS();

  // When any of the convert buttons are clicked, convert text.
  $('.case-btn').click(function() {
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

// Initialize functions after page loads.
let initJS = function() {
  // Enable tooltips
  $(function() {
    $('[data-toggle="tooltip"]').tooltip();
  });

  // Enable copy to clipboard functionality
  copyToClipboard();
};

// Copy to clipboard function. Also handles tooltip.
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
