$(document).ready( () => {
  let form = $('#weatherForm');
  form.submit( (e) => {
    // Stop browser from submitting form
    e.preventDefault();

    showWeather(form);
  });
});

let showWeather = (form) => {
  let city = form.find('#city').val();

  $.ajax({
    method: 'POST',
    url: 'weather',
    data: {
      'city': city,
    },
    success: function(response) {
      $('#weather').text(response);
    },
  });
};
