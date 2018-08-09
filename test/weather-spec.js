'use strict';
require('dotenv').config();

const Chai = require('chai');
const expect = Chai.expect;

const weatherApp = require('../routes/weather-server.js');

describe('#Get weather', function() {
  it('should return weather string.', function() {
    expect(weatherApp.getWeather('berlin')).to.be.a('string');
  });
});
