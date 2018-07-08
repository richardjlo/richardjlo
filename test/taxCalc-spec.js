'use strict';

const Chai = require('chai');
const expect = Chai.expect;

const taxCalc = require('../routes/taxCalc.js');

// Normalizes bracket for usage in this program.
// Minus 1 from all minimum threshholds greater than 0.
// Convert dollars into cents by multiplying all threshholds by 100.
const initializedTaxBrackets = [
  [.10, 0, 932500],
  [.15, 932500, 3795000],
  [.25, 3795000, 9190000],
  [.28, 9190000, 19165000],
  [.33, 19165000, 41670000],
  [.35, 41670000, 41840000],
  [.396, 41840000, 1000000000000],
];

describe('#Calculate effective tax rate', function() {
  it('taxCalc.js file should exist', function() {
      expect(taxCalc).to.not.be.undefined;
  });

  it('calculateTax should exist', function() {
    expect(taxCalc.calculateTax).to.not.be.undefined;
  });

  it('should calculate effective tax rate based on ($19,000)', function() {
      // Check tax on $19,000. Should be $2,383.75
      expect(taxCalc.calculateTax(19000)).to.eql({
        tax: '2,383.75',
        taxAsPercentOfIncome: '12.55',
        taxBracketPercentage: '15.00',
      });
  });

  it('should calculate effective tax rate based on ($20,000)', function() {
      // Check tax on $20,000. Should be $2,533.75
      expect(taxCalc.calculateTax(20000)).to.eql({
        tax: '2,533.75',
        taxAsPercentOfIncome: '12.67',
        taxBracketPercentage: '15.00',
      });
  });

  it('should calculate effective tax rate based on ($80,000)', function() {
      // Check tax on $80,000. Should be $15,738.75
      expect(taxCalc.calculateTax(80000)).to.eql({
        tax: '15,738.75',
        taxAsPercentOfIncome: '19.67',
        taxBracketPercentage: '25.00',
      });
  });
});

describe('#Initialize Federal Tax Brackets', function() {
  const taxBracket2017 = [
    [.10, 0, 9325],
    [.15, 9326, 37950],
    [.25, 37951, 91900],
    [.28, 91901, 191650],
    [.33, 191651, 416700],
    [.35, 416701, 418400],
    [.396, 418401, 1000000000000],
  ];

  let expectedSolution = [
    [.10, 0, 932500],
    [.15, 932500, 3795000],
    [.25, 3795000, 9190000],
    [.28, 9190000, 19165000],
    [.33, 19165000, 41670000],
    [.35, 41670000, 41840000],
    [.396, 41840000, 100000000000000],
  ];

  it('initTaxBrackets function should exist', function() {
    expect(taxCalc.initTaxBrackets(taxBracket2017)).to.not.be.undefined;
  });

  it('should initialize the a given federal tax brackets for this program',
  function() {
    expect(taxCalc.initTaxBrackets(taxBracket2017)).
    to.eql(expectedSolution);
  });
});

describe('#Which tax bracket', function() {
  // Function should exist
  it('whichBracket function should exist', function() {
    expect(taxCalc.whichBracket).to.not.be.undefined;
  });

  // Check tax bracket for $80,000. Should be 2.
  it('should return the tax bracket based on income ($80,000)', function() {
    expect(taxCalc.whichBracket(initializedTaxBrackets, 8000000)).to.equal(2);
  });

  // Check tax bracket for $19,000. Should be 1.
  it('should return the tax bracket based on income ($19,000)', function() {
    expect(taxCalc.whichBracket(initializedTaxBrackets, 1900000)).to.equal(1);
  });

  // Check tax bracket for $191,651. Should be 4.
  it('should return the tax bracket based on income ($191,651)', function() {
    expect(taxCalc.whichBracket(initializedTaxBrackets,
      19165100)).to.equal(4);
  });
});

describe('#Calculate single tax bracket', function() {
  it('calculateSingleBracket function should exist', function() {
    expect(taxCalc.calculateSingleBracket).to.not.be.undefined;
  });

  it('should retun tax owed for bracket ($91,900.00)', function() {
    expect( taxCalc.calculateSingleBracket([.25, 3795000, 9190000],
      9190000)).to.be.equal(1348750);
  });

  it('should retun tax owed for bracket ($115,000.00)', function() {
    expect( taxCalc.calculateSingleBracket([.28, 9190000, 19165000],
      11500000)).to.be.equal(646800);
  });

  it('should retun tax owed for bracket ($107,000.00)', function() {
    expect( taxCalc.calculateSingleBracket([.28, 9190000, 19165000],
      10700000)).to.be.equal(422800);
  });

  it('should retun tax owed for bracket ($106,187.61)', function() {
    expect( taxCalc.calculateSingleBracket([.28, 9190000, 19165000],
      10618761)).to.be.equal(400053);
  });
});
