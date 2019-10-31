const { User } = require("../../models/user");
const { Team } = require("../../models/team");
const { Task } = require("../../models/task");
const { Workspace } = require("../../models/workspace");
const { Project } = require("../../models/project");

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
