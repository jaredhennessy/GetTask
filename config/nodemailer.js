const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "GetTask2020@gmail.com",
    pass: "5iWy2x@H4TLf@RBG"
  }
});

module.exports = transporter;
