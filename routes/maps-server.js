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
