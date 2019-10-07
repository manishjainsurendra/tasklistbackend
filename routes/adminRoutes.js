const express = require("express");
const passport = require("passport");
const passportConfig = require("../passport/passportConfig");
const router = express.Router();

// controllers
const adminLoginController = require("../controllers/adminControllers/adminLoginController");
const createAdminDataController = require("../controllers/adminControllers/createAdminDataController");
const addAdminDataController = require("../controllers/adminControllers/addAdminDataController");
const getAdminDataController = require("../controllers/adminControllers/getAdminDataController");
// admin login contoller
router
  .route("/login")
  .post(
    passport.authenticate(passportConfig.METHOD_LOCAL, { session: false }),
    adminLoginController.adminLogin
  );

//create
router
  .route("/workspace/create")
  .post(
    passport.authenticate(passportConfig.STRATEGY_JWT, { session: false }),
    createAdminDataController.createWorkspace
  );
router
  .route("/users/create")
  .post(
    passport.authenticate(passportConfig.STRATEGY_JWT, { session: false }),
    createAdminDataController.createUser
  );
router
  .route("/projects/create")
  .post(
    passport.authenticate(passportConfig.STRATEGY_JWT, { session: false }),
    createAdminDataController.createProject
  );
router
  .route("/teams/create")
  .post(
    passport.authenticate(passportConfig.STRATEGY_JWT, { session: false }),
    createAdminDataController.createTeam
  );
router
  .route("/tasks/create")
  .post(
    passport.authenticate(passportConfig.STRATEGY_JWT, { session: false }),
    createAdminDataController.createTask
  );

//add
router
  .route("/projects/assignTeam/:id")
  .post(
    passport.authenticate(passportConfig.STRATEGY_JWT, { session: false }),
    addAdminDataController.assignTeamToProject
  );
router
  .route("/teams/users/:id")
  .post(
    passport.authenticate(passportConfig.STRATEGY_JWT, { session: false }),
    addAdminDataController.addMemberToTeam
  );

//get
router
  .route("/users")
  .get(
    passport.authenticate(passportConfig.STRATEGY_JWT, { session: false }),
    getAdminDataController.getAllUsers
  );

router
  .route("/users/:id")
  .get(
    passport.authenticate(passportConfig.STRATEGY_JWT, { session: false }),
    getAdminDataController.getUserById
  );

router
  .route("/users/projects/:id")
  .get(
    passport.authenticate(passportConfig.STRATEGY_JWT, { session: false }),
    getAdminDataController.getProjectsByUserId
  );

router
  .route("/users/tasks/:id")
  .get(
    passport.authenticate(passportConfig.STRATEGY_JWT, { session: false }),
    getAdminDataController.getTasksByUserId
  );

router
  .route("/users/teams/:id")
  .get(
    passport.authenticate(passportConfig.STRATEGY_JWT, { session: false }),
    getAdminDataController.getTeamsByUserId
  );

router
  .route("/teams")
  .get(
    passport.authenticate(passportConfig.STRATEGY_JWT, { session: false }),
    getAdminDataController.getAllTeams
  );

router
  .route("/teams/:id")
  .get(
    passport.authenticate(passportConfig.STRATEGY_JWT, { session: false }),
    getAdminDataController.getTeamById
  );

router
  .route("/teams/projects/:id")
  .get(
    passport.authenticate(passportConfig.STRATEGY_JWT, { session: false }),
    getAdminDataController.getProjectsByTeamId
  );

router
  .route("/teams/members/:id")
  .get(
    passport.authenticate(passportConfig.STRATEGY_JWT, { session: false }),
    getAdminDataController.getMembersByTeamId
  );

router
  .route("/tasks")
  .get(
    passport.authenticate(passportConfig.STRATEGY_JWT, { session: false }),
    getAdminDataController.getAllTasks
  );

router
  .route("/tasks/:id")
  .get(
    passport.authenticate(passportConfig.STRATEGY_JWT, { session: false }),
    getAdminDataController.getTaskById
  );

router
  .route("/projects")
  .get(
    passport.authenticate(passportConfig.STRATEGY_JWT, { session: false }),
    getAdminDataController.getAllProjects
  );

router
  .route("/projects/:id")
  .get(
    passport.authenticate(passportConfig.STRATEGY_JWT, { session: false }),
    getAdminDataController.getProjectById
  );

router
  .route("/projects/tasks/:id")
  .get(
    passport.authenticate(passportConfig.STRATEGY_JWT, { session: false }),
    getAdminDataController.getTasksByProjectId
  );

router
  .route("/workspaces")
  .get(
    passport.authenticate(passportConfig.STRATEGY_JWT, { session: false }),
    getAdminDataController.getAllWorkspaces
  );
router
  .route("/workspaces/:id")
  .get(
    passport.authenticate(passportConfig.STRATEGY_JWT, { session: false }),
    getAdminDataController.getAllWorkspaces
  );
router
  .route("/workspaces/projects/:id")
  .get(
    passport.authenticate(passportConfig.STRATEGY_JWT, { session: false }),
    getAdminDataController.getProjectsByWorkspaceId
  );

module.exports = router;
