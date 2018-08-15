const request = require('request');
const rp = require('request-promise');
const open_weather_api_key = process.env.OPEN_WEATHER_API_KEY;

module.exports.getWeather = (city) => {
  let url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + open_weather_api_key;
  rp(url, (error, response, body) => {
  }).then(function(body) {
    let result = JSON.parse(body);
    let temp = result.main.temp;
    console.log('It\'s '+ temp + 'F in ' + city);
  });
};
