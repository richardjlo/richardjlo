const rp = require('request-promise');
const openWeatherApiKey = process.env.OPEN_WEATHER_API_KEY;

module.exports.getWeather = (city) => {
  let url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city +
    '&units=imperial&appid=' + openWeatherApiKey;
  rp(url, (error, response, body) => {
  }).then(function(body) {
    let result = JSON.parse(body);
    let temp = result.main.temp;
    console.log('It\'s '+ temp + 'F in ' + city);
  });
};
