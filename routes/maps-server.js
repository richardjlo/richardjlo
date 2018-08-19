
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

const rp = require('request-promise');
let fourSquareSecret = process.env.FOURSQUARE_CLIENT_SECRET;

module.exports.helloWorld = () => {
  // Get vegan restaurants in area.
  let options = {
    url: 'https://api.foursquare.com/v2/venues/search',
    method: 'GET',
    qs: {
      client_id: 'Y0IWGKGNDLQUEOA2QLRUILZYN5DNGMTMXAIJZAB00YLQZETR',
      client_secret: fourSquareSecret,
      radius: '1000',
      section: 'food',
      categoryId: '4bf58dd8d48988d1d3941735',
      ll: '52.510411, 13.457715', // TODO - update with user's lat, long
      v: '20180323',
      limit: 5,
    },
  };

  rp(options)
    .then(function(body) {
      let result = JSON.parse(body);
      let venues = result.response.venues;
      for (let venue of venues) {
        getVenue(venue.id);
      }
    })
    .catch(function(err) {
      console.error(err);
    });
};


// Get name, rating of restaurants.
let getVenue = (venueId) => {
  let options = {
    url: 'https://api.foursquare.com/v2/venues/' + venueId,
    method: 'GET',
    qs: {
      client_id: 'Y0IWGKGNDLQUEOA2QLRUILZYN5DNGMTMXAIJZAB00YLQZETR',
      client_secret: fourSquareSecret,
      v: '20180323',
    },
  };

  rp(options)
    .then(function(body) {
      let venue = JSON.parse(body).response.venue;
      console.log(venue.name + ' ' + venue.rating);
    })
    .catch(function(err) {
      console.error(err);
    });
};
