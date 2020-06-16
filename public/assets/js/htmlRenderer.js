const path = require("path");
const fs = require("fs");

const templatesDir = path.resolve(__dirname, "../templates");

// call render in the app
const render = taskList => {
  const html = [];
  for (let i = 0; i < taskList.length; i++) {
    let template = fs.readFileSync(
      path.resolve(templatesDir, "task.html"),
      "utf8"
    );

    // Replace get functions with however to pull the property from sequelize
    template = replacePlaceholders(template, "taskID", taskList[i].getID());
    template = replacePlaceholders(
      template,
      "taskTitle",
      taskList[i].getTitle()
    );
    template = replacePlaceholders(
      template,
      "completionDate",
      taskList[i].getDate()
    );
    template = replacePlaceholders(
      template,
      "assigneeID",
      taskList[i].getAssignee()
    );
    html.push(template);
  }
  return renderList(html.join(""));
};

const renderList = html => {
  const template = fs.readFileSync(
    path.resolve(templatesDir, "list.html"),
    "utf8"
  );
  return replacePlaceholders(template, "tasks", html);
};

const replacePlaceholders = (template, placeholder, value) => {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return template.replace(pattern, value);
};

module.exports = render;
