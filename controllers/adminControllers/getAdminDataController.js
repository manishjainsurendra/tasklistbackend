const { User } = require("../../models/user");
const { Team } = require("../../models/team");
const { Task } = require("../../models/task");
const { Workspace } = require("../../models/workspace");
const { Project } = require("../../models/project");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.getProjectsByUserId = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).populate("projects");
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.getTasksByUserId = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).populate("tasks");
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.getTeamsByUserId = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).populate("teams");
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find({});
    res.send(teams);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.getTeamById = async (req, res) => {
  try {
    const id = req.params.id;
    const team = await Team.findById(id);
    res.json(team);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.getProjectsByTeamId = async (req, res) => {
  try {
    const id = req.params.id;
    const team = await Team.findById(id).populate("projects");
    res.json(team);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.getMembersByTeamId = async (req, res) => {
  try {
    const id = req.params.id;
    const team = await Team.findById(id).populate("members");
    res.json(team);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({})
      .sort("dueDate")
      .populate("projectId")
      .populate("userId");
    res.send(tasks);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.getTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id)
      .populate("projectId")
      .populate("userId");
    res.json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({})
      .sort("dueDate")
      .populate("teamId")
      .populate("workspaceId");
    res.send(projects);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.getProjectById = async (req, res) => {
  try {
    const id = req.params.id;
    const project = await Project.findById(id);
    res.json(project);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getTasksByProjectId = async (req, res) => {
  try {
    const id = req.params.id;
    const project = await Project.findById(id).populate("tasks");
    res.json(project);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllWorkspaces = async (req, res) => {
  try {
    const workspaces = await Workspace.find({});
    res.send(workspaces);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getWorkspaceById = async (req, res) => {
  try {
    const id = req.params.id;
    const workspace = await Workspace.findById(id);
    res.json(workspace);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getProjectsByWorkspaceId = async (req, res) => {
  try {
    const id = req.params.id;
    const workspace = await Workspace.findById(id).populate("projects");
    console.log(workspace.projects);
    res.json(workspace);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
