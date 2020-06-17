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

$(() => {
  $("#newTask").on("submit", event => {
    event.preventDefault();
    const taskTitle = $("#title")
      .val()
      .trim();
    const taskDesc = $("#desc")
      .val()
      .trim();

    const newTask = {
      title: taskTitle,
      description: taskDesc
    };

    $.ajax("/api/new", {
      type: "POST",
      data: newTask
    }).then(() => {
      window.location.replace("/list");
    });
  });
});
