const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/userController"); // Combine route handlers when possible
router.route("/signup").post(signup);
router.route("/login").post(login);
const {
  uploadEvent,
  deleteEvent,
  updateEvent,
} = require("../controllers/eventControllers");
router.route("/uploadEvent").post(uploadEvent);
router.route("/deleteEvent").post(deleteEvent);
router.route("/updateEvent").post(updateEvent);
const { notification } = require("../controllers/notificationController");
router.route("/notification").post(notification);
const { uploadImage } = require("../controllers/imageController");
router.route("/uploadImage").post(uploadImage);
module.exports = router;
