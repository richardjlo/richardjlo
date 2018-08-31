$(document).ready(function() {
  let form = $('#restaurantsForm');
  form.submit( (e) => {
    navigator.geolocation.getCurrentPosition(function(pos) {
      let coordinates = pos.coords;
      let ll = coordinates.latitude + ', ' + coordinates.longitude;
      $('#ll').val(ll);
      getRestaurants(form);
    }, error, options);

    // Stop browser from submitting form
    e.preventDefault();
  });
});

// let location = '52.510411, 13.457715';
let getRestaurants = (form, ll) => {
  $.ajax({
    method: 'POST',
    url: 'vegan-eats',
    data: form.serialize(),
  }).done( (response) => {
    let sortedRestaurants = response;
    if (sortedRestaurants.length == 0) {
      alert('Sorry, we didn\'t find any vegan restaurants near you.');
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


let options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};


function error(err) {
  // console.warn(`ERROR(${err.code}): ${err.message}`);
  console.log('Error ' + err);
}
