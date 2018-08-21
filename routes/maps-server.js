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
      let venue = venues[0];
      let options2 = {
        url: 'https://api.foursquare.com/v2/venues/' + venue.id,
        method: 'GET',
        qs: {
          client_id: 'Y0IWGKGNDLQUEOA2QLRUILZYN5DNGMTMXAIJZAB00YLQZETR',
          client_secret: fourSquareSecret,
          v: '20180323',
        },
      };
      return rp(options2); // Get details about venue.
    })
    .then(function(body) {
      let venue = JSON.parse(body).response.venue;
      console.log(venue.name + ' ' + venue.rating);
    })
    .catch(function(err) {
      console.error(err);
    });
};
