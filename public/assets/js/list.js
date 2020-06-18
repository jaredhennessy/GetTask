$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.firstName);
  });

  $("li").on("click", (event) => {
    event.preventDefault();
    console.log(event)
    let taskId = $(this).data("id");
    $(location).attr("href", "/task/" + taskId);
  });

  $("#btnNew").on("click", () => {
    $(location).attr("href", "/new");
  });

  // fetcCityData();
  // function fetcCityData() {
  //   $.ajax({
  //     url: "https://geolocation-db.com/jsonp",
  //     jsonpCallback: "callback",
  //     dataType: "jsonp",
  //     success: function(location) {
  //       console.log(location);
  //     }
  //   });
  // }
});

//=================SideNav trigger=================//
document.addEventListener("DOMContentLoaded", () => {
  const elems = document.querySelectorAll(".sidenav");
  const instances = M.Sidenav.init(elems);
  console.log(instances);
});
