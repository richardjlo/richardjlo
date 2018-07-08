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
});

// Upper case
// Sentence case
