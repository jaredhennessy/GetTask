//===============Calendar plugin===================//
document.addEventListener("DOMContentLoaded", () => {
  const elems = document.querySelectorAll(".datepicker");
  const instances = M.Datepicker.init(elems);
  console.log(instances);
});
//=================SideNav trigger=================//
document.addEventListener("DOMContentLoaded", () => {
  const elems = document.querySelectorAll(".sidenav");
  const instances = M.Sidenav.init(elems);
  console.log(instances);
});
<<<<<<< HEAD
//=============initialize input counter===========//
=======

>>>>>>> 660d7c725e379ffa3f45a2c502a650f57274aab9
$(document).ready(() => {
  $("input#input_text, textarea#textarea2").characterCounter();
});
