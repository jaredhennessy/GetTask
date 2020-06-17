//===============Calendar plugin===================//
document.addEventListener("DOMContentLoaded", () => {
  const elems = document.querySelectorAll(".datepicker");
  const instances = M.Datepicker.init(elems);
  console.log(instances);
});

$(document).ready(() => {
  const taskId = $("#taskId").text();
  let userId;

  $.get("/api/user_data").then(data => {
    userId = data.id;
  });

  $("#btnBack").on("click", () => {
    $(location).attr("href", "/list");
  });

  $("#btnSave").on("click", () => {
    const newDate = $("#formDate").val();
    const taskData = { id: taskId, estCompletion: newDate };
    console.log(taskData);
    updateTask(taskData);
  });

  $("#btnAssign").on("click", () => {
    const taskData = { id: taskId, assigneeId: userId };
    console.log(taskData);
    updateTask(taskData);
  });

  $("#btnComplete").on("click", () => {
    const taskData = { id: taskId, estCompletion: newDate };
    console.log(taskData);
    updateTask(taskData);
  });

  function updateTask(taskData) {
    console.log(taskData);
    $.ajax({
      method: "PUT",
      url: "/api/task",
      data: taskData
    }).then(() => {
      window.location.replace("/list");
    });
  }
});
