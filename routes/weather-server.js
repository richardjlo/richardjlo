const request = require('request');
const open_weather_api_key = process.env.OPEN_WEATHER_API_KEY;


// TODO - Return weatherStr AFTER request function is complete.
module.exports.getWeather = (city) => {
  let weatherStr = '';
  let url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + open_weather_api_key;
  request(url, (err, response, body) => {
    if (err) {
      console.log('error:', error);
    } else {
      let weather = JSON.parse(body);
      weatherStr = 'It\'s '+ weather.main.temp + 'F in ' + city;
      console.log(weatherStr);
      return weatherStr;
    }
  });
};
