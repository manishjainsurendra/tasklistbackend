const express = require("express");
const passport = require("passport");
const passportConfig = require("../passport/passportConfig");
const router = express.Router();

// controllers
const adminLoginController = require("../controllers/adminControllers/adminLoginController");
const getUserDataController = require("../controllers/userControllers/getController");
const updateUserDataController = require("../controllers/userControllers/updateController");

router
  .route("/login")
  .post(
    passport.authenticate(passportConfig.METHOD_LOCAL, { session: false }),
    adminLoginController.adminLogin
  );

router
  .route("/projects/:id")
  .get(
    passport.authenticate(passportConfig.STRATEGY_JWT, { session: false }),
    getUserDataController.getProjectsByUserId
  );
router
  .route("/projects/:id")
  .put(
    passport.authenticate(passportConfig.STRATEGY_JWT, { session: false }),
    updateUserDataController.updateProjectStatus
  );
router
  .route("/tasks/:id")
  .get(
    passport.authenticate(passportConfig.STRATEGY_JWT, { session: false }),
    getUserDataController.getTasksByUserId
  );

router
  .route("/tasks/:id")
  .put(
    passport.authenticate(passportConfig.STRATEGY_JWT, { session: false }),
    updateUserDataController.updateTaskStatus
  );
router
  .route("/users/teams/:id")
  .get(
    passport.authenticate(passportConfig.STRATEGY_JWT, { session: false }),
    getUserDataController.getTeamsByUserId
  );

module.exports = router;
