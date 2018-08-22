const Promise = require('bluebird');
const rp = require('request-promise');
const _ = require('underscore');
let fourSquareSecret = process.env.FOURSQUARE_CLIENT_SECRET;

module.exports.getVegan = (location, res) => {
  // Search for vegan restaurants in area.
  let options = {
    url: 'https://api.foursquare.com/v2/venues/search',
    method: 'GET',
    qs: {
      client_id: 'Y0IWGKGNDLQUEOA2QLRUILZYN5DNGMTMXAIJZAB00YLQZETR',
      client_secret: fourSquareSecret,
      radius: '1000',
      section: 'food',
      categoryId: '4bf58dd8d48988d1d3941735',

      // TODO - update with user's lat, long. Get from browser.
      ll: '52.510411, 13.457715',
      v: '20180323',
      limit: 3,
    },
  };
  rp(options)
    // Get detailed descriptions of each venue.
    .then(function(body) {
      let result = JSON.parse(body);
      let venues = result.response.venues;

      return Promise.map(venues, function(venue) {
        let options2 = {
          url: 'https://api.foursquare.com/v2/venues/' + venue.id,
          method: 'GET',
          qs: {
            client_id: 'Y0IWGKGNDLQUEOA2QLRUILZYN5DNGMTMXAIJZAB00YLQZETR',
            client_secret: fourSquareSecret,
            v: '20180323',
          },
        };
        return rp(options2);
      });
    })
    .then(function(result) {
      let venue;
      let restaurants = [];

      // Populate restaurants array with name and rating.
      for (let i = 0; i < result.length; i++) {
        venue = JSON.parse(result[i]).response.venue;
        let restaurant = {
          name: venue.name,
          rating: venue.rating,
        };
        restaurants.push(restaurant);
      }

      // Sort restaurants array
      let sortedRestaurants = _.sortBy(restaurants, 'rating').reverse();
      return sortedRestaurants;
    })
    .then(function(sortedRestaurants) {
      res.send(sortedRestaurants);
    })
    .catch(function(err) {
      console.error(err);
    });
};
