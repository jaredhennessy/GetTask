//===============Calendar plugin===================//
document.addEventListener("DOMContentLoaded", () => {
  const elems = document.querySelectorAll(".datepicker");
  const instances = M.Datepicker.init(elems);
  console.log(instances);
});

$(document).ready(() => {
  const taskId = $("#taskId").text();
  let userId;
  let taskTitle;
  let creatorFirstName;
  // let creatorLastName;

  $.get("/api/task/" + taskId)
    .then(task => {
      taskTitle = task.title;
      creatorFirstName = task["creator.firstName"];
      // creatorLastName = task["creator.lastName"];
      creatorEmail = task["creator.email"];
    })
    .then(() => {
      // console.log(creatorFirstName);
      // console.log(creatorLastName);
      // console.log(creatorEmail);
    });

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
      estCompletion: newDate,
      creatorEmail: creatorEmail,
      subject: "GetTask: '" + taskTitle + "' updated",
      text:
        "Hello " +
        creatorFirstName +
        "! Task " +
        taskId +
        " has been updated. Click here for details: https://calm-scrubland-27592.herokuapp.com/task/" +
        taskId
    };
    updateTask(updTask);
  });

  $("#btnAssign").on("click", () => {
    const updTask = {
      id: taskId,
      assigneeId: userId,
      creatorEmail: creatorEmail,
      subject: "GetTask: '" + taskTitle + "' updated",
      text:
        "Hello " +
        creatorFirstName +
        "! Task " +
        taskId +
        " has been assigned. Click here for details: https://calm-scrubland-27592.herokuapp.com/task/" +
        taskId
    };
    updateTask(updTask);
  });

  $("#btnComplete").on("click", () => {
    const updTask = {
      id: taskId,
      complete: true,
      creatorEmail: creatorEmail,
      subject: "GetTask: '" + taskTitle + "' updated",
      text:
        "Hello " +
        creatorFirstName +
        "! Task " +
        taskId +
        " has been completed. Click here for details: https://calm-scrubland-27592.herokuapp.com/task/" +
        taskId
    };
    updateTask(updTask);
  });

  function updateTask(taskData) {
    $.ajax({
      method: "PUT",
      url: "/api/task",
      data: taskData
    }).then(() => {
      window.location.replace("/list");
    });
  }
});
