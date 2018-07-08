'use strict';

const Chai = require('chai');
const expect = Chai.expect;

const convertCase = require('../routes/convert-case-server.js');

describe('#convertCase file should exist', function() {
  it('convert-case-server.js file should exist', function() {
    expect(convertCase).to.not.be.undefined;
  });
});
