const express = require("express");
const passport = require("passport");
const passportConfig = require("../passport/passportConfig");
const router = express.Router();

// controllers
const adminLoginController = require("../controllers/adminControllers/adminLoginController");

// admin login contoller
router
  .route("/login")
  .post(
    passport.authenticate(passportConfig.METHOD_LOCAL, { session: false }),
    adminLoginController.adminLogin
  );

module.exports = router;
