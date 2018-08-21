const rp = require('request-promise');
let fourSquareSecret = process.env.FOURSQUARE_CLIENT_SECRET;

module.exports.helloWorld = () => {
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
      ll: '52.510411, 13.457715', // TODO - update with user's lat, long
      v: '20180323',
      limit: 5,
    },
  };
  rp(options)
    // Get detailed descriptions of each venue.
    .then(function(body) {
      let result = JSON.parse(body);
      let venues = result.response.venues;
      let promises = [];

      // Create array of promises
      for (let venue of venues) {
        let options2 = {
          url: 'https://api.foursquare.com/v2/venues/' + venue.id,
          method: 'GET',
          qs: {
            client_id: 'Y0IWGKGNDLQUEOA2QLRUILZYN5DNGMTMXAIJZAB00YLQZETR',
            client_secret: fourSquareSecret,
            v: '20180323',
          },
        };
        promises.push(rp(options2));
      }

      // Call all promises. Expect output to be an array of venue details
      return Promise.all(promises);
    })
    .then(function(result) {
      let venue;

      // Print out all details. 
      for (let i = 0; i < result.length; i++) {
        venue = JSON.parse(result[i]).response.venue;
        console.log(venue.name + ' ' + venue.rating);
      }
    })
    .catch(function(err) {
      console.error(err);
    });
};
