const express = require("express");
const Router = express.Router();
const cguController = require("../controller/cguController");
const middleware = require("../controller/authController");
Router.route("/show").get(cguController.getCgu);
Router.route("/cguUpdate").put(middleware.isConnect, cguController.updateCgu);

module.exports = Router;
