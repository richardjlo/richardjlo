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

          // Multiply by 100 to display in % form.
          let taxAsPercentOfIncomeStr =
            (response.taxAsPercentOfIncome * 100).toFixed(2) + '%';

          // Multiply by 100 to display in % form.
          let taxBracketPercentageStr =
            (response.taxBracketPercentage * 100).toFixed(2) + '%';

          $('#tax').html(taxStr);
          $('#taxAsPercentOfIncome').html(taxAsPercentOfIncomeStr);
          $('#taxBracketPercentage').html(taxBracketPercentageStr);
        },
    });
  });
});
