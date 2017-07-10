$(document).ready(function() {
  $("#btn").on('click', function(event) {
    event.preventDefault();
    getLatLon();
  });
});

function getLatLon() {
  $.ajax({
    url: "http://ip-api.com/json",
    type: "GET",
    dataType: "json",
    cache: false
  }).done(function(data) {
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + data.city + "&appid=5648c0aea6747ada27ac9941dece97d9&units=metric",
        type: 'GET',
        dataType: 'json',
        cache: false,
      })
      .done(function(data) {
        data = {
          current: data.main,
          weather: data.weather[0],
          name: data.name,
          country: data.sys.country
        };
        console.log(data);
      }).error(function(data) {
        console.log(data);
      });
  });
}

var weather = function functionName(data) {
  var cityName = data.name;
  var country = data.country;
  var temp = data.current.temp;
  var tempMax = data.current.temp_max;
  var tempMin = data.current.temp_min;



}
