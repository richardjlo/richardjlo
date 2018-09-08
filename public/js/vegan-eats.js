$(document).ready(function() {
  let form = $('#restaurantsForm');
  form.submit( (e) => {
    let success = (pos) => {
      let coordinates = pos.coords;
      let ll = coordinates.latitude + ', ' + coordinates.longitude;
      // let ll = '52.510411, 13.457715'; // TEST -- Berlin
      console.log('lat long: ' + ll); // TEST
      $('#ll').val(ll);
      getRestaurants(form);
    };

    let error = (err) => {
      console.log('Error code: ' + err.code + ' (' + err.message + ')');
      if (err.code == 1) {
        alert('Please allow your browser to access your location.');
      }
    };

    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(success, error, options);

    // Stop browser from submitting form
    e.preventDefault();
  });
});

let getRestaurants = (form, ll) => {
  $.ajax({
    method: 'POST',
    url: 'vegan-eats',
    data: form.serialize(),
  }).done( (response) => {
    let sortedRestaurants = response;
    if (sortedRestaurants.length == 0) {
      $('#no-results-alert').addClass( 'show' );
    } else {
      // Print each restaurant
      for (let restaurant of sortedRestaurants) {
        $('.restaurants-list').append(
          '<li class="list-group-item"><a href="https://www.google.com/maps/search/?api=1&query=' + restaurant.name + '"' + ' target="_blank">' + restaurant.name + ' ' + restaurant.rating + '</a></li>');
      }
    }
  }).fail( (error) => {
    console.log(error);
  });
};
