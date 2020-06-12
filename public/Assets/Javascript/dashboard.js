$(document).ready(() => {
  fetcCityData();
  function fetcCityData() {
    $.ajax({
      url: "https://geolocation-db.com/jsonp",
      jsonpCallback: "callback",
      dataType: "jsonp",
      success: function(location) {
        console.log(location);
      }
    });
  }
});
