$(document).ready(function() {
  $(function() {
    $('[data-toggle="tooltip"]').tooltip();
  });

  $('.copy-btn').click(function() {
    copyToClipboard();
  });
});


// Copy to clipboard function. Also handles tooltip.
let copyToClipboard = function() {
  let clipboard = new ClipboardJS('.copy-btn');

  clipboard.on('success', function(e) {
    let btn = e.trigger;

    // Update tooltip
    let originalText = $(btn).attr('data-original-title');
    $(btn).attr('data-original-title', 'Copied!').tooltip('show');
    $(btn).attr('data-original-title', originalText);
  });

  clipboard.on('error', function(e) {
      console.error('Action:', e.action);
      console.error('Trigger:', e.trigger);
  });
};
