const express = require("express");
const Router = express.Router();

const authController = require("../controller/authController");

Router.route("/signup").post(authController.signUp);
Router.route("/signin").post(authController.signIn);

module.exports = Router;
