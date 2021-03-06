module.exports.calculateTax = function(taxableIncome) {
  // Convert taxableIncome to cents
  taxableIncome *= 100;
  const taxBracket2017 = [
    [.10, 0, 9325],
    [.15, 9326, 37950],
    [.25, 37951, 91900],
    [.28, 91901, 191650],
    [.33, 191651, 416700],
    [.35, 416701, 418400],
    [.396, 418401, 1000000000000],
  ];
  let initializedTaxBrackets = this.initTaxBrackets(taxBracket2017);
  let bracketIndex;
  let bracket;
  let bracketMax;
  let tax = 0;
  let taxAsPercentOfIncome;
  let taxBracket;
  let taxBracketPercentage;

  bracketIndex = this.whichBracket(initializedTaxBrackets, taxableIncome);
  taxBracket = initializedTaxBrackets[bracketIndex];

  // Add full brackets to tax.
  for (let i = 0; i < bracketIndex; i++) {
    bracket = initializedTaxBrackets[i];
    bracketMax = bracket[2];
    tax += this.calculateSingleBracket(bracket, bracketMax);
  }

  // Add partial bracket to tax.
  tax += this.calculateSingleBracket(taxBracket, taxableIncome);

  // Calculate tax as percentage of income
  taxAsPercentOfIncome = Math.round((tax / taxableIncome) * 10000) / 10000;
  taxAsPercentOfIncome = (taxAsPercentOfIncome * 100).toFixed(2);

  // Calculate taxBracket send as percentage.
  taxBracketPercentage = taxBracket[0];
  taxBracketPercentage = (taxBracketPercentage * 100).toFixed(2);

  // Returns tax in dollars, taxAsPercentOfIncome and taxBracketPercentage
  // in percentage formats.
  return {
    // Divide by 100 to show result in dollars instead of cents.
    tax: (tax / 100).toLocaleString('en'),

    // Multiply by 100 to show result in percentage
    taxAsPercentOfIncome: taxAsPercentOfIncome,

    // Multiply by 100 to show result in percentage
    taxBracketPercentage: taxBracketPercentage,
  };
};

module.exports.initTaxBrackets = function(originalFedTaxBrackets) {
  let initializedTaxBrackets = [];
  let taxRate;
  let bracketMin;
  let bracketMax;
  let origTaxRate;
  let origbracketMin;
  let origibracketMax;

  for (let i = 0; i < originalFedTaxBrackets.length; i++) {
    origTaxRate = originalFedTaxBrackets[i][0];
    origbracketMin = originalFedTaxBrackets[i][1];
    origibracketMax = originalFedTaxBrackets[i][2];

    // Keep tax rate same
    taxRate = origTaxRate;

    // Minus 1 from all minimum threshholds greater than 0.
    // Convert dollars into cents by multiplying all threshholds by 100.
    if (origbracketMin > 0) {
      bracketMin = (origbracketMin - 1) * 100;
    } else {
      bracketMin = 0;
    }

    bracketMax = origibracketMax * 100;
    initializedTaxBrackets.push([taxRate, bracketMin, bracketMax]);
  }
  return initializedTaxBrackets;
};

module.exports.whichBracket = function(initializedTaxBrackets, taxableIncome) {
  let bracket;
  let margTaxBracket;
  let bracketMin;
  let bracketMax;

  for (let i = 0; i < initializedTaxBrackets.length; i++) {
    margTaxBracket = initializedTaxBrackets[i];
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
