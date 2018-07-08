'use strict';

const Chai = require('chai');
const expect = Chai.expect;

const convertCase = require('../routes/convert-case-server.js');

describe('#convertCase file should exist', function() {
  it('convert-case-server.js file should exist', function() {
    expect(convertCase).to.not.be.undefined;
  });
});

// Lower case
describe('#convert text to lower case', function() {
  it('lower function should exist', function() {
    expect(convertCase.lower).to.not.be.undefined;
  });

  // 'HELLO' should return 'hello'
  it('should return a string with all lower case characters', function() {
    expect(convertCase.lower('HELLO')).to.equal('hello');
  });

  // 'HELLO RICHARD' should return 'hello richard'
  it('should return a string with all lower case characters', function() {
    expect(convertCase.lower('HELLO RICHARD')).to.equal('hello richard');
  });

  // 'HELLO RICHARD' should return 'hello richard'
  it('should return a string with all lower case characters', function() {
    expect(convertCase.lower('H3LL0 R1CHARD222')).to.equal('h3ll0 r1chard222');
  });
});

describe('#convert text to upper case', function() {
  it('upper function should exist', function() {
    expect(convertCase.upper).to.not.be.undefined;
  });

  // 'HELLO RICHARD' should return 'hello richard'
  it('should return a string with all upper case characters', function() {
    expect(convertCase.upper('hello richard')).to.equal('HELLO RICHARD');
  });
});
// Upper case
// Sentence case
