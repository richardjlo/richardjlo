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
    // alert('fail');
    console.log(error);
  });
};
