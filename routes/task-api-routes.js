const db = require("../models");

module.exports = function(app) {
  app.get("/api/list", (req, res) => {
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
      res.json(dbTask);
    });
  });

  app.get("/api/list/:id", (req, res) => {
    db.Task.findOne({
      where: {
        id: req.params.id
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
      res.json(dbTask);
    });
  });

  app.post("/api/posts", (req, res) => {
    db.Task.create(req.body).then(dbTask => {
      res.json(dbTask);
    });
  });

  app.put("/api/posts", (req, res) => {
    db.Task.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(dbTask => {
      res.json(dbTask);
    });
  });
};
