$(document).ready(function() {
  let form = $('#taxable-income-form');

  $(form).submit(function(e) {
    // Stop browser from submitting form
    e.preventDefault();

    let salaryAmount = $('#salary-amount').val();

    // Submit the form using AJAX.
    $.ajax({
        type: 'POST',
        url: 'tax-calculator',
        data: {salary: salaryAmount},
        success: function(response) {
          //console.log(response.tax / 100);
          let taxStr = '$' + response.tax / 100;
          $('#tax').html(taxStr);
        },
    });
  });
});
