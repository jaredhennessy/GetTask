$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  let userId;
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.firstName);
    userId = data.id;
  });

  $(".collection-item").on("click", event => {
    event.preventDefault();

    console.log(event.currentTarget.children[1].children[1].children[0].firstChild.textContent);
    // const taskId = event.currentTarget.children[1].firstChild.textContent;
    // $(location).attr("href", "/task/" + taskId);
  });

  $("#btnAll").on("click", () => {
    $(location).attr("href", "/list");
  });

  $("#btnMe").on("click", () => {
    $(location).attr("href", "/list/" + userId);
  });

  $("#btnNone").on("click", () => {
    $(location).attr("href", "/list/none");
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
