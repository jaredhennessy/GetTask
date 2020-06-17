//=================SideNav trigger=================//
document.addEventListener("DOMContentLoaded", () => {
  const elems = document.querySelectorAll(".sidenav");
  const instances = M.Sidenav.init(elems);
  console.log(instances);
});

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
      taskTitle: taskTitle,
      taskDesc: taskDesc
    };

    $.ajax("/api/new", {
      type: "POST",
      data: newTask
    }).then(() => {
      window.location.replace("/list");
    });
  });
});
