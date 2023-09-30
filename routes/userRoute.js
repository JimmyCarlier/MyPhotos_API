const express = require("express");
const Router = express.Router();
const middleware = require("../controller/authController");
const userController = require("../controller/userController");
const authController = require("../controller/authController");
const nodemailer = require("nodemailer");

Router.route("/signup").post(authController.signUp);
Router.route("/signin").post(authController.signIn);
Router.route("/update").put(
  middleware.isConnect,
  userController.updatePassword
);
Router.route("/updatepsw").put(userController.forgottenPassword);

Router.route("/password-reset").post(async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();
  const userEmail = req.body.emailId;
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ebc25dab56fb2c",
      pass: "0f98cf8a0b1f43",
    },
  });
  let info = await transport.sendMail({
    from: "myPhotos@mailtrap.club",
    to: "demo@gmail.com",
    subject: "First Test",
    html: `<p>Pour changer votre mot de passe, veuillez vous diriger :</p><a href="http://localhost:3001/changePassword/?user=${userEmail}">Ici</a>`,
  });
});

module.exports = Router;
