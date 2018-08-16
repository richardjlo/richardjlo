$(document).ready( () => {
  let form = $('#weatherForm');
  form.submit( (e) => {
    // Stop browser from submitting form
    e.preventDefault();

    showWeather(form);
  });
});

let showWeather = (form) => {
  $.ajax({
    method: 'POST',
    url: 'weather',
    data: form.serialize(),
  }).done( (response) => {
    $('#weather').text(response);
  }).fail( (error) => {
    if (error.status == 400) {
      $('#weather').text('<-- Please enter a city');
    } else if (error.status == 404) {
      $('#weather').text('We couldn\'t find your city. Please try again.');
    }
  });
};
