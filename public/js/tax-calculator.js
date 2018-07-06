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
          // Add $ sign and commas.
          let taxStr = '$' + (response.tax).toLocaleString('en');

          // Add % to string
          let taxAsPercentOfIncomeStr = response.taxAsPercentOfIncome + '%';

          // Add % to string
          let taxBracketPercentageStr = response.taxBracketPercentage + '%';

          $('#tax').html(taxStr);
          $('#taxAsPercentOfIncome').html(taxAsPercentOfIncomeStr);
          $('#taxBracketPercentage').html(taxBracketPercentageStr);
        },
    });
  });
});
