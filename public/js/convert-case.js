$(document).ready(function() {
  initTooltips('.copy-btn', 'Copy to clipboard');

  $('.copy-btn').click(function() {
    copyToClipboard();
  });

  $('.case-btn').click(function() {
    let textArea = $('#textArea');
    let btnId = this.id;
    let caseType;

    switch (btnId) {
      case 'upper-btn':
        caseType = 'upper';
        break;
      case 'lower-btn':
        caseType = 'lower';
        break;
      case 'title-btn':
        caseType = 'title';
        break;
      case 'sentence-btn':
        caseType = 'sentence';
        break;
    }

    convertCase(textArea, caseType);
  });
});

// Convert case
// Takes the text area that needs to be converted and
// a caseType (upper, lower, sentence, title)
let convertCase = function(textArea, caseType) {
    $.ajax({
      type: 'POST',
      url: 'convert-case',
      data: {
        text: textArea.val(),
        caseType: caseType,
      },
      success: function(response) {
        textArea.val(response.text);
      },
    });
};

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
