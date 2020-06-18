const express = require("express");
const router = express.Router();
const db = require("../models");
const transporter = require("../config/nodemailer.js");

const scripts = [
  { script: "https://code.jquery.com/jquery-3.4.1.min.js" },
  // { script: "https://code.jquery.com/jquery.js" },
  { script: "../assets/js/materialize.js" }
];

router.get("/", (req, res) => {
  scripts.push({ script: "../assets/js/init.js" });
  scripts.push({ script: "../assets/js/login.js" });
  res.render("index", {
    title: "GetTask",
    loginoutLink: "/signup",
    loginoutText: "Sign Up",
    listText: "",
    userText: "",
    scripts: scripts
  });
});

router.get("/signup", (req, res) => {
  scripts.push({ script: "../assets/js/signup.js" });
  res.render("signup", {
    title: "Sign Up",
    loginoutLink: "/",
    loginoutText: "Log In",
    listText: "",
    userText: "",
    scripts: scripts
  });
});

router.get("/new", (req, res) => {
  scripts.push({ script: "../assets/js/new.js" });
  res.render("new", {
    title: "New Task",
    loginoutLink: "/",
    loginoutText: "Logout",
    listText: "Tasks",
    userText: "Users",
    scripts: scripts
  });
});

router.post("/api/new", (req, res) => {
  db.Task.create(req.body).then(newTask => {
    // console.log(req.body);
    res.json(newTask);
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
    scripts.push({ script: "../assets/js/list.js" });
    res.render("list", {
      title: "Task List",
      loginoutLink: "/",
      loginoutText: "Logout",
      listText: "Tasks",
      userText: "Users",
      scripts: scripts,
      tasks
    });
  });
});

router.get("/api/list/:id", (req, res) => {
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
  }).then(dbTask => {
    res.json(dbTask);
  });
});

router.get("/api/list", (req, res) => {
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
  }).then(dbTask => {
    res.json(dbTask);
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
    // console.log(task);
    scripts.push({ script: "../assets/js/task.js" });
    res.render("task", {
      title: "Edit Task",
      loginoutLink: "/",
      loginoutText: "Logout",
      listText: "Tasks",
      userText: "Users",
      scripts: scripts,
      id: task.id,
      taskTitle: task.title,
      taskDesc: task.description,
      estCompletion: task.estCompletion
    });
  });
});

router.put("/api/task/", (req, res) => {
  console.log(req.body);

  const mailOptions = {
    from: "GetTask2020@gmail.com",
    to: req.body.creatorEmail,
    subject: req.body.subject,
    text: req.body.text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  db.Task.update(req.body, {
    where: {
      id: req.body.id
    }
  }).then(dbTask => {
    res.json(dbTask);
  });
});

router.get("/api/task/:id", (req, res) => {
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
    res.json(task);
  });
});

router.get("/users", (req, res) => {
  db.sequelize
    .query(
      "SELECT `u`.`id`, `u`.`firstName`, `u`.`lastName`, `u`.`email`, CONCAT(LEFT(`u`.`firstName`,1), LEFT(`u`.`lastName`,1)) AS `Initials`, COUNT(DISTINCT `c`.`id`) AS `TicketsCreated`, COUNT(DISTINCT `a`.`id`) AS `TicketsAssignedTotal`, COUNT(DISTINCT CASE WHEN `a`.`complete` = true THEN `a`.`id` ELSE NULL END) AS `TicketsAssignedClosed`, COUNT(DISTINCT CASE WHEN `a`.`complete` = false THEN `a`.`id` ELSE NULL END) AS `TicketsAssignedOpen` FROM `Users` AS `u` LEFT JOIN `Tasks` AS `a` ON `u`.`id` = `a`.`assigneeId` LEFT JOIN `Tasks` AS `c` ON `u`.`id` = `c`.`creatorId` GROUP BY `u`.`id`, `u`.`firstName`, `u`.`lastName`, `u`.`email`, CONCAT(LEFT(`u`.`firstName`,1), LEFT(`u`.`lastName`,1));",
      { type: db.sequelize.QueryTypes.SELECT }
    )
    .then(users => {
      scripts.push({ script: "../assets/js/users.js" });
      res.render("users", {
        title: "User List",
        loginoutLink: "/",
        loginoutText: "Logout",
        listText: "Tasks",
        userText: "Users",
        scripts: scripts,
        users
      });
    });
});

router.get("/api/users", (req, res) => {
  db.sequelize
    .query(
      "SELECT `u`.`id`, `u`.`firstName`, `u`.`lastName`, `u`.`email`, CONCAT(LEFT(`u`.`firstName`,1), LEFT(`u`.`lastName`,1)) AS `Initials`, COUNT(DISTINCT `c`.`id`) AS `TicketsCreated`, COUNT(DISTINCT `a`.`id`) AS `TicketsAssignedTotal`, COUNT(DISTINCT CASE WHEN `a`.`complete` = true THEN `a`.`id` ELSE NULL END) AS `TicketsAssignedClosed`, COUNT(DISTINCT CASE WHEN `a`.`complete` = false THEN `a`.`id` ELSE NULL END) AS `TicketsAssignedOpen` FROM `Users` AS `u` LEFT JOIN `Tasks` AS `a` ON `u`.`id` = `a`.`assigneeId` LEFT JOIN `Tasks` AS `c` ON `u`.`id` = `c`.`creatorId` GROUP BY `u`.`id`, `u`.`firstName`, `u`.`lastName`, `u`.`email`, CONCAT(LEFT(`u`.`firstName`,1), LEFT(`u`.`lastName`,1));",
      { type: db.sequelize.QueryTypes.SELECT }
    )
    .then(dbTask => {
      res.json(dbTask);
    });
});

module.exports = router;
