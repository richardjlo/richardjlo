$(document).ready(function() {
  let form = $('#restaurantsForm');
  form.submit( (e) => {
    // Stop browser from submitting form
    e.preventDefault();
    getRestaurants(form);
  });
});

// let location = '52.510411, 13.457715';
let getRestaurants = (form) => {
  $.ajax({
    method: 'POST',
    url: 'vegan-eats',
    data: form.serialize(),
  }).done( (response) => {
    let sortedRestaurants = response;
    // Print each restaurant
    for (let restaurant of sortedRestaurants) {
      $('.restaurants-list').append(
        '<li class="list-group-item"><a href="https://www.google.com/maps/search/?api=1&query=' + restaurant.name + '"' + ' target="_blank">' + restaurant.name + ' ' + restaurant.rating + '</a></li>');
    }
  }).fail( (error) => {
    console.log(error);
  });
};
