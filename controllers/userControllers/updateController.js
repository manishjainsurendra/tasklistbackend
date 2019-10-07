const { User } = require("../../models/user");
const { Team } = require("../../models/team");
const { Task } = require("../../models/task");
const { Workspace } = require("../../models/workspace");
const { Project } = require("../../models/project");
exports.updateTaskStatus = async (req, res) => {
  try {
    const id = req.params.id;
    await Task.findByIdAndUpdate(id, { $set: { flag: "completed" } });
    res.status(200).json({ message: "task completed successfully" });
  } catch (e) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.updateProjectStatus = async (req, res) => {
  try {
    const id = req.params.id;
    await Project.findByIdAndUpdate(id, { $set: { flag: "completed" } });
    res.status(200).json({ message: "Project completed successfully" });
  } catch (e) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
