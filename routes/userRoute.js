const express = require("express");
const Router = express.Router();
const middleware = require("../controller/authController");
const userController = require("../controller/userController");
const authController = require("../controller/authController");

Router.route("/signup").post(authController.signUp);
Router.route("/signin").post(authController.signIn);
Router.route("/update").put(
  middleware.isConnect,
  userController.updatePassword
);

module.exports = Router;
