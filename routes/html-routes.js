const path = require("path");

// Checks if user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // Anybody can access this page.
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/signup", (req, res) => {
    //Anyone can access this page.
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", (req, res) => {
    // If the user is already logged in, send them to the list page. If they are not logged in, let them go to the login page.
    if (req.user) {
      res.redirect("/list");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  //The following routes can only be accessed by authenticated users.
  app.get("/list", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/list.html"));
  });

  app.get("/new", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/new.html"));
  });

  app.get("/task", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/task.html"));
  });

  app.get("/users", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/users.html"));
  });
};
