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
          let tax = response.tax;
          let taxAsPercentOfIncome = response.taxAsPercentOfIncome;
          let taxBracketPercentage = response.taxBracketPercentage;

          $('#tax').html('$' + tax);
          $('#taxAsPercentOfIncome').html(taxAsPercentOfIncome + '%');
          $('#taxBracketPercentage').html(taxBracketPercentage + '%');
        },
    });
  });
});
