// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
  // If the user has valid login credentials, send them to the members page.
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  //  If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    console.log(req.body);
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's first name, last name, email, and task points
      res.json({
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        taskpoints: req.user.taskpoints
      });
    }
  });

  // app.get("/api/users", (req, res) => {
  //   const queryStr =
  //     "SELECT u.id, u.firstName, u.lastName, u.email, COUNT(DISTINCT CASE WHEN a.complete = 'false' THEN a.id ELSE NULL END) `Open Tickets`, COUNT(DISTINCT CASE WHEN a.complete = 'true' THEN a.id ELSE NULL END) `Closed Tickets`, COUNT(DISTINCT c.id) `Created Tickets` FROM users u LEFT JOIN tasks a ON u.id = a.assigneeId LEFT JOIN tasks c ON u.id = c.creatorId GROUP BY u.id, u.firstName, u.lastName, u.email";
  //     const [results, metadata] = await sequelize.query(queryStr);
  //   });

  app.get("/api/users", (req, res) => {
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
          as: "assigned",
          attributes: []
        },
        {
          model: db.Task,
          as: "created",
          attributes: []
        }
        // ,
        // count({
        //   include: {
        //     model: db.Task,
        //     as: "assigned",
        //     distinct: true,
        //     attributes: ["assigneeId"],
        //     where: { complete: true }
        //   },
        //   col: "id",
        //   as: "ticketsClosed"
        // })
      ],
      raw: true
    }).then(dbTask => {
      res.json(dbTask);
    });
  });
};
