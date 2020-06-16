var taskRow = document.querySelector(".taskRow");
var taskList = document.querySelector(".taskList");

console.log(taskRow);
console.log(taskList);

class Task {
  constructor(taskID, taskTitle, completionDate, assigneeInitials) {
    this.taskID = taskID;
    this.taskTitle = taskTitle;
    this.completionDate = completionDate;
    this.assigneeInitials = assigneeInitials;
  }
}


var taskList = [];
var testTask = new Task(1, "TestTitle", "6/16/20", "TM");
taskList.push(testTask);




var addTask = (taskList[0]) => {

  var newTask =   
};

addTask();

// Character counter
// $(document).ready(function() {
//     $('input#input_text, textarea#textarea2').characterCounter();
//   });
