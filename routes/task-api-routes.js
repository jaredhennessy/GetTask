const db = require("../models");

module.exports = function(app) {
  app.get("/api/list", (req, res) => {
    db.Task.findAll({
      where: {
        complete: true
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
    }).then(dbPost => {
      res.json(dbPost);
    });
  });

  // app.get("/api/list/:id", (req, res) => {
  //   db.Task.findOne({
  //     where: {
  //       assigneeId: req.params.id
  //     },
  //     include: [db.User],
  //     as: "User"
  //   }).then(dbPost => {
  //     res.json(dbPost);
  //   });
  // });
};
