$(document).ready(function() {
  $('.btn').click(function() {
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
