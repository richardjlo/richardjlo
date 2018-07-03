'use strict';

const Chai = require('chai');
const expect = Chai.expect;

const taxCalc = require('../taxCalc.js');

const taxRates2017 = [
  [.10, 0, 9326],
  [.15, 9326, 37951],
  [.25, 37951, 91901],
  [.28, 91901, 191651],
  [.33, 191651, 416701],
  [.35, 416701, 418401],
  [.396, 418401, 418401],
];

describe('#Calculate effective tax rate', function() {
  it('should exist', function() {
      expect(taxCalc).to.not.be.undefined;
  });

  it('should calculate effective tax rate', function() {
      let taxAmount;

      // Check tax on $19,000. Should be $2,383.75
      taxAmount = taxCalc.calculateTax(19000);
      expect(taxAmount).to.equal(2383.75);

      // // Check tax on $80,000. Should be $15,738.75
      // taxAmount = taxCalc.calculateTax(80000);
      // expect(taxAmount).to.equal(15738.75);
  });
});

describe('#Which tax bracket', function() {
  // Function should exist
  it('should exist', function() {
    expect(taxCalc.whichBracket).to.not.be.undefined;
  });

  it('should return the tax bracket based on income ($80,000)', function() {
    expect( taxCalc.whichBracket(taxRates2017, 80000) ).to.equal(2);
  });

  // Check tax bracket for $19,000. Should be 1.
  it('should return the tax bracket based on income ($19,000)', function() {
    expect( taxCalc.whichBracket(taxRates2017, 19000) ).to.equal(1);
  });

  // Check tax bracket for $191,651. Should be 4.
  it('should return the tax bracket based on income ($191,651)', function() {
    expect( taxCalc.whichBracket(taxRates2017, 191651) ).to.equal(4);
  });
});
