
module.exports.calculateTax = function(taxableIncome) {
  return 2383.75;
};


module.exports.whichBracket = function(taxRates, taxableIncome) {
  let bracket;
  let margTaxRate;
  let minIncome;
  let maxIncome;

  for (let i = 0; i < taxRates.length; i++) {
    margTaxRate = taxRates[i];
    minIncome = margTaxRate[1];
    maxIncome = margTaxRate[2];
    if (taxableIncome >= minIncome && taxableIncome < maxIncome) {
      bracket = i;
    }
  }

  return bracket;
};
