$(document).ready(function() {
  // When Sentence button is clicked
  $('#sentence').click(function() {
    // alert('Sentence button clicked!');


    // alert();
    $.ajax({
      type: 'POST',
      url: 'convert-case',
      data: {
        text: $('#textArea').val(),
        case: 'sentence',
      },
      success: function(response) {
        $('#textArea').val(response.text);
      },
    });
  });

  // When Lower button is clicked
  $('#lower').click(function() {
    alert('Lower button clicked!');
  });

  // When Upper button is clicked
  $('#upper').click(function() {
    alert('Upper button clicked!');
  });
});
