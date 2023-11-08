const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  checkauth,
  logout,
} = require("../controllers/userController"); // Combine route handlers when possible
const { notification } = require("../controllers/notificationController");
const { uploadImage } = require("../controllers/imageController");
const {
  uploadEvent,
  deleteEvent,
  updateEvent,
} = require("../controllers/eventControllers");
const {
  uploadFaq,
  deleteFaq,
  updateFaq,
} = require("../controllers/faqController");

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/checkauth").post(checkauth);
router.route("/uploadEvent").post(uploadEvent);
router.route("/deleteEvent").delete(deleteEvent);
router.route("/updateEvent").put(updateEvent);
router.route("/notification").post(notification);
router.route("/uploadImage").post(uploadImage);
router.route("/uploadFaq").post(updateFaq);
router.route("/deleteFaq").delete(deleteFaq);
router.route("/updateFaq").put(updateFaq);

module.exports = router;
