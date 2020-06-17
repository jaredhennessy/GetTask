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
    const updTask = {
      id: taskId,
      estCompletion: newDate
    };
    console.log(updTask);
    updateTask(updTask);
  });

  $("#btnAssign").on("click", () => {
    const updTask = {
      id: taskId,
      assigneeId: userId
    };
    console.log(updTask);
    updateTask(updTask);
  });

  $("#btnComplete").on("click", () => {
    const updTask = {
      id: taskId,
      complete: true
    };
    console.log(updTask);
    updateTask(updTask);
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
