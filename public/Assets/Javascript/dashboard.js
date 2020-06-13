$(document).ready(() => {
  fetcCityData();
  function fetcCityData() {
    $.ajax({
      url: "https://geolocation-db.com/jsonp",
      jsonpCallback: "callback",
      dataType: "jsonp",
      success: function(location) {
        console.log(location);
      },
    });
  }
});
//=================SideNav trigger=================//
document.addEventListener("DOMContentLoaded", () => {
  const elems = document.querySelectorAll(".sidenav");
  const instances = M.Sidenav.init(elems);
  console.log(instances);
});
