$(document).ready(function() {
  initTooltips('.copy-btn', 'Copy to clipboard');

  $('.copy-btn').click(function() {
    copyToClipboard();
  });
});

let initTooltips = function(elementClass, tooltipTitle) {
  $(elementClass).tooltip({
    trigger: 'hover',
    placement: 'top',
    title: tooltipTitle,
  });
};

// Copy to clipboard function. Also handles tooltip.
let copyToClipboard = function() {
  let clipboard = new ClipboardJS('.copy-btn');

  clipboard.on('success', function(e) {
    let btn = e.trigger;
    let originalMessage = $(btn).attr('data-original-title');
    showTooltip(btn, 'Copied!');
    hideTooltip(btn);
    resetTooltip(btn, originalMessage);
  });

  clipboard.on('error', function(e) {
      console.error('Action:', e.action);
      console.error('Trigger:', e.trigger);
  });
};

let showTooltip = function(btn, message) {
  $(btn).attr('data-original-title', message).tooltip('show');
};

let resetTooltip = function(btn, originalMessage) {
  $(btn).attr('data-original-title', originalMessage);
};

let hideTooltip = function(btn) {
  setTimeout(function() {
    $(btn).tooltip('hide');
  }, 1000);
};
