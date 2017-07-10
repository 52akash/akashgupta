var units = {
  metric: {
    name: "Metric",
    code: "C",
    value: "Celsius"
  },
  imperial: {
    name: "Imperial",
    code: "F",
    value: "Fahrenheit"
  }
};

var currUnt = units.metric;
var weather;

function initialize() {
  $(".unit").html(currUnt.code);
  weather = new Weather();
}

function registerEvents() {
  //unit conversion and update
  $('.unit').on('click', function(evt) {
    evt.preventDefault();
    currUnt = (currUnt === units.metric) ? units.imperial : units.metric;
    $(".unit").html(currUnt.code);
  });
}
$(document).ready(function() {
  registerEvents();
  initialize();

  // var weather = getLatLon();
  // if (weather != null) {
  //   weather.update();
  // }
});

function Weather(data) {
  this.cityName = null;
  this.country = null;
  this.temp = null;
  this.tempMax = null;
  this.tempMin = null;


  this.load = function() {
    $.ajax({
      url: "http://ip-api.com/json",
      type: "GET",
      dataType: "json",
      cache: false
    }).done(function(data) {
      $.ajax({
          url: "http://api.openweathermap.org/data/2.5/weather?q=" + data.city + "&appid=5648c0aea6747ada27ac9941dece97d9&units=" + currUnt.name,
          type: 'GET',
          dataType: 'json',
          cache: false,
        })
        .done(function(data) {
          cityName = data.name;
          country = data.sys.country;
          temp = data.main.temp;
          tempMax = data.main.temp_max;
          tempMin = data.main.temp_min;
          $(".city").html(data.name + ", " + data.sys.country + new Date(data.dt * 1000).toLocaleTimeString());
          $(".weather").html(data.weather[0].main);
          $(".temp").html(data.main.temp + "&deg");
        }).error(function(data) {
          return null;
        });
    });
  }

  this.load();

}
