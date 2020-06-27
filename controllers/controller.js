const express = require("express"),
  router = express.Router(),
  db = require("../models"),
  transporter = require("../config/nodemailer.js"),
  isAuthenticated = require("../config/middleware/isAuthenticated"),
  compression = require("compression"),
  scripts = [
    { script: "https://code.jquery.com/jquery-2.1.1.min.js" },
    { script: "../assets/js/materialize.js" }
  ];

router.use(compression());

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
    loginoutLink: "/logout",
    loginoutText: "Log In",
    listText: "",
    userText: "",
    scripts: scripts
  });
});

router.get("/new", isAuthenticated, (req, res) => {
  scripts.push({ script: "../assets/js/new.js" });
  res.render("new", {
    title: "New Task",
    loginoutLink: "/logout",
    loginoutText: "Logout",
    listText: "Tasks",
    userText: "Users",
    scripts: scripts
  });
});

router.post("/api/new", (req, res) => {
  db.Task.create({
    title: req.body.title,
    description: req.body.description,
    creatorId: req.body.creatorId
  })
    .then(result => {
      console.log("Task created: " + result.id);
      // res.json(newTask);
      res.json(200);
    })
    .catch(err => {
      res.status(401).json(err);
    });
});

router.get("/list/:filter?", isAuthenticated, (req, res) => {
  let whereClause;
  const filter = req.params.filter;
  if (req.params.filter === "none") {
    whereClause = { complete: false, assigneeId: null };
  } else if (req.params.filter === "all" || !filter) {
    whereClause = { complete: false };
  } else {
    whereClause = { complete: false, assigneeId: filter };
  }

  db.Task.findAll({
    where: whereClause,
    order: [
      ["estCompletion", "ASC"],
      ["createdAt", "ASC"]
    ],
    include: [
      {
        model: db.User,
        as: "assignee",
        attributes: ["firstName", "lastName", "email", "color"]
      },
      {
        model: db.User,
        as: "creator",
        attributes: ["firstName", "lastName", "email", "color"]
      }
    ],
    raw: true
  }).then(tasks => {
    scripts.push({ script: "../assets/js/list.js" });
    res.render("list", {
      title: "Task List",
      loginoutLink: "/logout",
      loginoutText: "Logout",
      listText: "Tasks",
      userText: "Users",
      scripts: scripts,
      tasks
    });
  });
});

router.get("/api/list/:filter?", isAuthenticated, (req, res) => {
  let whereClause;
  const filter = req.params.filter;
  if (req.params.filter === "none") {
    whereClause = { complete: false, assigneeId: null };
  } else if (req.params.filter === "all" || !filter) {
    whereClause = { complete: false };
  } else {
    whereClause = { complete: false, assigneeId: filter };
  }

  db.Task.findAll({
    where: whereClause,
    order: [
      ["estCompletion", "ASC"],
      ["createdAt", "ASC"]
    ],
    include: [
      {
        model: db.User,
        as: "assignee",
        attributes: ["firstName", "lastName", "email", "color"]
      },
      {
        model: db.User,
        as: "creator",
        attributes: ["firstName", "lastName", "email", "color"]
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
        attributes: ["firstName", "lastName", "email", "color"]
      },
      {
        model: db.User,
        as: "creator",
        attributes: ["firstName", "lastName", "email", "color"]
      }
    ],
    raw: true
  }).then(task => {
    // console.log(task);
    scripts.push({ script: "../assets/js/task.js" });
    res.render("task", {
      title: "Edit Task",
      loginoutLink: "/logout",
      loginoutText: "Logout",
      listText: "Tasks",
      userText: "Users",
      scripts: scripts,
      id: task.id,
      taskTitle: task.title,
      taskDesc: task.description,
      estCompletion: task.estCompletion,
      assigneeFirstName: task["assignee.firstName"],
      assigneeLastName: task["assignee.lastName"],
      assigneeEmail: task["assignee.email"],
      creatorFirstName: task["creator.firstName"],
      creatorLastName: task["creator.lastName"],
      creatorEmail: task["creator.email"]
    });
  });
});

router.put("/api/task/", (req, res) => {
  // console.log(req.body);

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
        attributes: ["firstName", "lastName", "email", "color"]
      },
      {
        model: db.User,
        as: "creator",
        attributes: ["firstName", "lastName", "email", "color"]
      }
    ],
    raw: true
  }).then(task => {
    res.json(task);
  });
});

const strQuery =
  "SELECT `id`, `firstName`, `lastName`, `email`, `color`, `Initials`, `TicketsCreated`, `TicketsAssignedTotal`,`TicketsAssignedClosed`,`TicketsAssignedOpen`,CASE WHEN `TicketsAssignedClosed` = 0 THEN 'https://img.shields.io/badge/completed-0-lightgrey' WHEN `TicketsAssignedClosed` BETWEEN 1 AND 3 THEN CONCAT('https://img.shields.io/badge/completed-',`TicketsAssignedClosed`,'-yellow') WHEN `TicketsAssignedClosed` BETWEEN 4 AND 6 THEN CONCAT('https://img.shields.io/badge/completed-',`TicketsAssignedClosed`,'-orange')  WHEN `TicketsAssignedClosed` BETWEEN 7 AND 9 THEN CONCAT('https://img.shields.io/badge/completed-',`TicketsAssignedClosed`,'-darkgreen') ELSE CONCAT('https://img.shields.io/badge/completed-',`TicketsAssignedClosed`,'-darkblue') END AS `badgeUrl` FROM (SELECT `u`.`id`, `u`.`firstName`, `u`.`lastName`, `u`.`email`, `u`.`color`, CONCAT(LEFT(`u`.`firstName`,1), LEFT(`u`.`lastName`,1)) AS `Initials`, COUNT(DISTINCT `c`.`id`) AS `TicketsCreated`, COUNT(DISTINCT `a`.`id`) AS `TicketsAssignedTotal`, COUNT(DISTINCT CASE WHEN `a`.`complete` = true THEN `a`.`id` ELSE NULL END) AS `TicketsAssignedClosed`, COUNT(DISTINCT CASE WHEN `a`.`complete` = false THEN `a`.`id` ELSE NULL END) AS `TicketsAssignedOpen` FROM `Users` AS `u` LEFT JOIN `Tasks` AS `a` ON `u`.`id` = `a`.`assigneeId` LEFT JOIN `Tasks` AS `c` ON `u`.`id` = `c`.`creatorId` GROUP BY `u`.`id`, `u`.`firstName`, `u`.`lastName`, `u`.`email`, CONCAT(LEFT(`u`.`firstName`,1), LEFT(`u`.`lastName`,1))) AS `a`;";

router.get("/users", isAuthenticated, (req, res) => {
  db.sequelize
    .query(strQuery, { type: db.sequelize.QueryTypes.SELECT })
    .then(users => {
      scripts.push({ script: "../assets/js/users.js" });
      res.render("users", {
        title: "User List",
        loginoutLink: "/logout",
        loginoutText: "Logout",
        listText: "Tasks",
        userText: "Users",
        scripts: scripts,
        users
      });
    });
});

router.get("/api/users", isAuthenticated, (req, res) => {
  db.sequelize
    .query(strQuery, { type: db.sequelize.QueryTypes.SELECT })
    .then(dbTask => {
      res.json(dbTask);
    });
});

module.exports = router;
