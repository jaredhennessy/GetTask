const express = require("express");
const router = express.Router();
const db = require("../models");

const scripts = [
  { script: "https://code.jquery.com/jquery-2.1.1.min.js" },
  { script: "assets/js/materialize.js" }
];

router.get("/", (req, res) => {
  scripts.push({ script: "/assets/js/init.js" });
  scripts.push({ script: "/assets/js/login.js" });
  res.render("index", {
    title: "GetTask",
    loginoutlink: "/signup",
    loginout: "Sign Up",
    list: "",
    users: "",
    scripts: scripts
  });
});

router.get("/new", (req, res) => {
  scripts.push({ script: "/assets/js/new.js" });
  res.render("new", {
    title: "New Task",
    loginoutlink: "/",
    loginout: "Logout",
    list: "Tasks",
    users: "Users",
    scripts: scripts
  });
});

router.get("/task", (req, res) => {
  scripts.push({ script: "/assets/js/task.js" });
  res.render("task", {
    title: "New Task",
    loginoutlink: "/",
    loginout: "Logout",
    list: "Tasks",
    users: "Users",
    scripts: scripts
  });
});

router.get("/signup", (req, res) => {
  scripts.push({ script: "/assets/js/signup.js" });
  res.render("signup", {
    title: "Sign Up",
    loginoutlink: "/",
    loginout: "Log In",
    list: "Tasks",
    users: "Users",
    scripts: scripts
  });
});

router.get("/list", (req, res) => {
  db.Task.findAll({
    where: {
      complete: false
    },
    include: [
      {
        model: db.User,
        as: "assignee",
        attributes: ["firstName", "lastName", "email"]
      },
      {
        model: db.User,
        as: "creator",
        attributes: ["firstName", "lastName", "email"]
      }
    ],
    raw: true
  }).then(tasks => {
    scripts.push({ script: "/assets/js/list.js" });
    res.render("list", {
      title: "Task List",
      loginoutlink: "/",
      loginout: "Logout",
      list: "Tasks",
      users: "Users",
      scripts: scripts,
      tasks
    });
  });
});

router.get("/task/:id", (req, res) => {
  db.Task.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: db.User,
        as: "assignee",
        attributes: ["firstName", "lastName", "email"]
      },
      {
        model: db.User,
        as: "creator",
        attributes: ["firstName", "lastName", "email"]
      }
    ],
    raw: true
  }).then(task => {
    scripts.push({ script: "/assets/js/task.js" });
    res.render("task", {
      title: "Edit Task",
      loginoutlink: "/",
      loginout: "Logout",
      list: "Tasks",
      users: "Users",
      scripts: scripts,
      task
    });
  });

  app.get("/users", (req, res) => {
    db.User.findAll({
      attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        [
          db.sequelize.fn("count", db.sequelize.col("assigned.id")),
          "ticketsAssignedTotal"
        ],
        [
          db.sequelize.fn("count", db.sequelize.col("assigned.id")),
          "ticketsAssignedOpen"
        ],
        [
          db.sequelize.fn("count", db.sequelize.col("assigned.id")),
          "ticketsAssignedClosed"
        ],
        [
          db.sequelize.fn("count", db.sequelize.col("created.id")),
          "ticketsCreated"
        ]
      ],
      group: ["id", "firstName", "lastName", "email"],
      include: [
        {
          model: db.Task,
          as: "assigned"
        },
        {
          model: db.Task,
          as: "created"
        }
      ],
      raw: true
    }).then(users => {
      scripts.push({ script: "/assets/js/task.js" });
      res.render("users", {
        title: "User List",
        loginoutlink: "/",
        loginout: "Logout",
        list: "Tasks",
        users: "Users",
        scripts: scripts,
        users
      });
    });
  });
});

module.exports = router;
