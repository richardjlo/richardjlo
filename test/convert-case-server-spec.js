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

// Upper case
describe('#convert text to upper case', function() {
  it('upper function should exist', function() {
    expect(convertCase.upper).to.not.be.undefined;
  });

  // 'HELLO RICHARD' should return 'hello richard'
  it('should return a string with all upper case characters', function() {
    expect(convertCase.upper('hello richard')).to.equal('HELLO RICHARD');
  });
});

// Sentence case
// Capitalize the first letter after a '.', '!', '?'
describe('#convert to sentence case.', function() {
  // Handle case of '.'
  it('should return a sentence case string (This is a test. My car is red.)',
    function() {
      expect(convertCase.sentenceCase('this is a test. my car is red.'))
      .to.equal('This is a test. My car is red.');
  });

  // Handle case of '.'
  it('should return a sentence case string for acronym (A.m.d.)', function() {
    expect(convertCase.sentenceCase('a.m.d'))
    .to.equal('A.m.d');
  });

  // Handle case of '!'
  it('should return a sentence case string ("!") ', function() {
    expect(convertCase.sentenceCase('this is a test! my car is red.'))
    .to.equal('This is a test! My car is red.');
  });

  // Handle case of '?'
  it('should return a sentence case string ("?") ', function() {
    expect(convertCase.sentenceCase('is this your house? it is very nice.'))
    .to.equal('Is this your house? It is very nice.');
  });

  // // Handle case of stand-alone 'I'
  it('should return a sentence case string (stand-alone "I") ', function() {
    expect(convertCase.sentenceCase('there was a time when i was young.'))
    .to.equal('There was a time when I was young.');
  });
});
