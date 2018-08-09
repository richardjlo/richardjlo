'use strict';

const Chai = require('chai');
const expect = Chai.expect;

const weatherApp = require('../routes/weather-server.js');

describe('#Get API Key', function() {
  it('should get API key.', function() {
    expect(weatherApp.getApiKey).to.not.be.undefined;
  });

  
});
