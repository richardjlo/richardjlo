
module.exports.calculateTax = function(federalTaxBrackets, taxableIncome) {
  let bracketIndex;
  let bracket;
  let tax = 0;
  let bracketMax;

  bracketIndex = this.whichBracket(federalTaxBrackets, taxableIncome);

  // Add full brackets to tax.
  for (let i = 0; i < bracketIndex; i++) {
    bracket = federalTaxBrackets[i];
    bracketMax = bracket[2];
    tax += this.calculateSingleBracket(bracket, bracketMax);
  }

  // Add partial bracket to tax.
  tax += this.calculateSingleBracket(federalTaxBrackets[bracketIndex],
    taxableIncome);
  return tax;
};

module.exports.whichBracket = function(federalTaxBrackets, taxableIncome) {
  let bracket;
  let margTaxBracket;
  let bracketMin;
  let bracketMax;

  for (let i = 0; i < federalTaxBrackets.length; i++) {
    margTaxBracket = federalTaxBrackets[i];
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
