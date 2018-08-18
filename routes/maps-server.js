
/*
const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

module.exports.helloWorld = () => {
  const googleMapsClient = require('@google/maps').createClient({
    key: googleMapsApiKey,
    Promise: Promise,
  });

  googleMapsClient.places({query: '1990 vegan living'})
    .asPromise()
    .then((response) => {
      let place = response.json.results;
      // console.log(place);
      let placeId = place[0].place_id;
      googleMapsClient.place({
          placeid: placeId,
          fields: ['name', 'opening_hours', 'price_level', 'rating'],
        })
        .asPromise()
        .then((response) => {
          console.log(response.json.result);
        }).catch((err) => {
          console.log('Error: ' + err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

*/

/*
module.exports.helloWorld = () => {
  const request = require('request');
  let fourSquareSecret = process.env.FOURSQUARE_CLIENT_SECRET;

  request({
    url: 'https://api.foursquare.com/v2/venues/search',
    method: 'GET',
    qs: {
      client_id: 'Y0IWGKGNDLQUEOA2QLRUILZYN5DNGMTMXAIJZAB00YLQZETR',
      client_secret: fourSquareSecret,
      radius: '1000',
      section: 'food',
      categoryId: '4bf58dd8d48988d1d3941735',
      ll: '52.510411, 13.457715',
      v: '20180323',
      limit: 5,
    },
  }, function(err, res, body) {
    if (err) {
      console.error(err);
    } else {
      let result = JSON.parse(body);
      let venues = result.response.venues;
      let count = 1;
      for (let venue of venues) {
        // console.log('ID: ' + venue.id + ' Name: ' + venue.name);
        console.log(count + ': ' + venue.name);
        count++;
      }
    }
  });
};

*/
const rp = require('request-promise');
let fourSquareSecret = process.env.FOURSQUARE_CLIENT_SECRET;

module.exports.helloWorld = () => {
  // const googleMapsClient = require('@google/maps').createClient({
  //   key: googleMapsApiKey,
  //   Promise: Promise,
  // });

  rp({
    url: 'https://api.foursquare.com/v2/venues/search',
    method: 'GET',
    qs: {
      client_id: 'Y0IWGKGNDLQUEOA2QLRUILZYN5DNGMTMXAIJZAB00YLQZETR',
      client_secret: fourSquareSecret,
      radius: '1000',
      section: 'food',
      categoryId: '4bf58dd8d48988d1d3941735',
      ll: '52.510411, 13.457715',
      v: '20180323',
      limit: 5,
    },
  }, function(err, response, body) {
    if (err) {
      console.error(err);
    } else {
      let result = JSON.parse(body);
      let venues = result.response.venues;
      let count = 1;
      for (let venue of venues) {
        // console.log('ID: ' + venue.id + ' Name: ' + venue.name);
        console.log(count + ': ' + venue.name);
        count++;
      }
    }
  }).then(() => {
    console.log('all done.');
  });
};
