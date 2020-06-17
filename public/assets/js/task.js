$(document).ready(() => {
  //===============Calendar plugin===================//
  document.addEventListener("DOMContentLoaded", () => {
    const elems = document.querySelectorAll(".datepicker");
    const instances = M.Datepicker.init(elems);
    console.log(instances);
  });

  $("#btnBack").on("click", () => {
    $(location).attr("href", "/list");
  });
});
