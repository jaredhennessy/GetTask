//=================SideNav trigger=================//
document.addEventListener("DOMContentLoaded", () => {
  const elems = document.querySelectorAll(".sidenav");
  const instances = M.Sidenav.init(elems);
  console.log(instances);
});

$(document).ready(() => {
  $("input#input_text, textarea#textarea2").characterCounter();

  let userId;

  $.get("/api/user_data").then(data => {
    userId = data.id;
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
        description: taskDesc,
        creatorId: userId
      };

      $.ajax("/api/new", {
        type: "POST",
        data: newTask
      }).then(() => {
        window.location.replace("/list");
      });
      event.stopImmediatePropagation();
    });
  });
});
