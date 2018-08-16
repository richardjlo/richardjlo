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
    success: function(response) {
      $('#weather').text(response);
    },
    error: function(error) {
      console.log('bad news bears: ' + error);
    },
  });
};
