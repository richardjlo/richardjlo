
module.exports.calculateTax = function(taxBracket, taxableIncome) {
  let tax;
  let bracket;
  let margTaxRate;
  let minIncome;
  let maxIncome;

  bracket = self.whichBracket(taxBracket, taxableIncome);

  return tax;
};

module.exports.whichBracket = function(taxBracket, taxableIncome) {
  let bracket;
  let margTaxBracket;
  let bracketMin;
  let bracketMax;

  for (let i = 0; i < taxBracket.length; i++) {
    margTaxBracket = taxBracket[i];
    bracketMin = margTaxBracket[1];
    bracketMax = margTaxBracket[2];
    if (taxableIncome > bracketMin && taxableIncome <= bracketMax) {
      bracket = i;
    }
  }

  return bracket;
};

module.exports.calculateSingleBracket = function(taxBracket, income) {
  const bracketMin = taxBracket[1];
  const taxRate = taxBracket[0];
  let tax;

  let taxableIncome = income - bracketMin;
  tax = taxableIncome * taxRate;

  return Math.round(tax);
};
