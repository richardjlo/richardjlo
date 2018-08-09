const request = require('request');
const open_weather_api_key = process.env.OPEN_WEATHER_API_KEY;
console.log('api key: ' + open_weather_api_key);

module.exports.showWeather = function() {
  let city = 'portland';
  let url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + open_weather_api_key;
  request(url, function(err, response, body) {
    if(err) {
      console.log('error:', error);
    } else {
      console.log('body:', body);
    }
  });
};

module.exports.getApiKey = function() {

};
