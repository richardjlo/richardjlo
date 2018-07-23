$(document).ready(function() {
  copyToClipboard();
});

// Copy to clipboard function. Also handles tooltip.
let copyToClipboard = function() {
  let clipboard = new ClipboardJS('.copy-btn');

  clipboard.on('success', function(e) {
  });

  clipboard.on('error', function(e) {
      console.error('Action:', e.action);
      console.error('Trigger:', e.trigger);
  });
};
