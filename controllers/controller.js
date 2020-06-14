const express = require("express");
const router = express.Router();
const db = require("../models");

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
    res.render("list", { tasks });
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
    res.render("task", { task });
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
      res.render("users", { users });
    });
  });
});

module.exports = router;
