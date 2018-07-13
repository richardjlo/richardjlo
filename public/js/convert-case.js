$(document).ready(function() {
  initJS();

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

// Initialize functions after page loads.
let initJS = function() {
  // Enable tooltips
  // $(function() {
  //   $('[data-toggle="tooltip"]').tooltip();
  // });

  // Enable copy to clipboard functionality
  copyToClipboard();
};

// Copy to clipboard function. Also handles tooltip.
let copyToClipboard = function() {
  let clipboard = new ClipboardJS('#copy-btn');

  clipboard.on('success', function(e) {
    alert('Copied!');
    // Update tooltip
    // let originalText = $('#copy-btn').attr('data-original-title');
    // $('#copy-btn').attr('data-original-title', 'Copied!').tooltip('show');
    // $('#copy-btn').attr('data-original-title', originalText);
  });

  clipboard.on('error', function(e) {
      console.error('Action:', e.action);
      console.error('Trigger:', e.trigger);
  });
};
