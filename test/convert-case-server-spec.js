'use strict';

const Chai = require('chai');
const expect = Chai.expect;

const convertCase = require('../routes/convert-case-server.js');

describe('#convertCase function', function() {
  let text;
  let caseType;
  it('should convert the case given text and caseType.', function() {
    text = 'this is a test. my car is red and i am tired.';
    caseType = 'sentence';
    expect( convertCase.convertCase(text, caseType) ).to.equal(
      'This is a test. My car is red and I am tired.');
  });

  it('should convert the case given text and caseType.', function() {
    text = 'this is a test. my car is red and i am tired.';
    caseType = 'lower';
    expect( convertCase.convertCase(text, caseType) ).to.equal(
      'this is a test. my car is red and i am tired.');
  });

  it('should convert the case given text and caseType.', function() {
    text = 'this is a test. my car is red and i am tired.';
    caseType = 'upper';
    expect( convertCase.convertCase(text, caseType) ).to.equal(
      'THIS IS A TEST. MY CAR IS RED AND I AM TIRED.');
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
