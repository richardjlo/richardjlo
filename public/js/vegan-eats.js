$(document).ready(function() {
  let form = $('#restaurantsForm');
  form.submit( (e) => {
    let success = (pos) => {
      let coordinates = pos.coords;
      let ll = coordinates.latitude + ', ' + coordinates.longitude;
      // let ll = '52.510411, 13.457715'; // TEST -- Berlin
      // let ll = '18.797580, 98.971439'; // TEST PT Residence, Chiang Mai
      // let ll = '-8.517996, 115.261374'; // TEST Hubud, Bali
      $('#ll').val(ll);
      getRestaurants(form);
    };

    let error = (err) => {
      console.log('Error code: ' + err.code + ' (' + err.message + ')');
      if (err.code == 1) {
        showAlert('alert-danger',
          'Please allow your browser to access your location.');
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
      showAlert('alert-warning',
        'Sorry, we didn\'t find any restaurants near you.');
    } else {
      $('#restaurants-table').removeClass( 'd-none');
      // Print each restaurant
      for (let restaurant of sortedRestaurants) {
        $('#restaurants').append(
          '<tr>' +
            '<th scope="row">' + restaurant.rating + '</th>' +
            '<td><a href="' + restaurant.url + ' " target="_blank">' + restaurant.name + '</a></td>' +
          '</tr>'
        );
      }
    }
  }).fail( (error) => {
    console.log(error);
  });
};

let showAlert = (alertType, msg) => {
  $('#no-results-alert').addClass( alertType + ' show' );
  $('#alert-text').html(msg);
};
