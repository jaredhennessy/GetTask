const express = require("express");
const router = express.Router();
const db = require("../models");
// const user = require("../models/user.js");
// const task = require("../models/task.js");

// router.get("/list", (req, res) => {
//   task.all(data => {
//     const taskObject = {
//       tasks: data
//     };
//     res.render("list", taskObject);
//   });
// });

router.get("/list", (req, res) => {
  db.Task.findAll({
    where: {
      complete: false
    },
    include: [
      {
        model: db.User,
        as: "assignee"
      },
      {
        model: db.User,
        as: "creator"
      }
    ]
  }).then(dbTask => {
    console.log(dbTask);
    res.render("list", dbTask);
  });
});

module.exports = router;
