const express = require("express");
const Router = express.Router();
const fileController = require("../controller/fileController");
const multer = require("../controller/multer-config");
const middleware = require("../controller/authController");

Router.route("/bestPictures").get(fileController.mostVoted);
Router.route("/userPicture").get(
  middleware.isConnect,
  fileController.picturesOfUser
);
Router.route("/allPhotos").get(fileController.publishedPicture);

Router.route("/unpublished").get(
  middleware.isConnect,
  fileController.unpublishedPicture
);

Router.route("/upload").post(
  middleware.isConnect,
  multer.single("file"),
  fileController.uploadFile
);

Router.route("/update").put(middleware.isConnect, fileController.updateFile);

Router.route("/updateVote/:id").put(fileController.updateVote);
module.exports = Router;
