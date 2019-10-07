const { validateWorkspace, Workspace } = require("../../models/workspace");
const { validateProject, Project } = require("../../models/project");
const { validateUser, User } = require("../../models/user");
const { validateTeam, Team } = require("../../models/team");
const { validateTask, Task } = require("../../models/task");

const _ = require("lodash");
exports.createWorkspace = async (req, res) => {
  try {
    const { error } = validateWorkspace(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name } = req.body;

    const workspace = await Workspace.findOne({ name: name });
    if (workspace) {
      return res.status(200).json({ message: name + "already exists" });
    }
    const newWorkspace = new Workspace({
      name
    });
    await newWorkspace.save();

    res.status(201).json({
      name: newWorkspace.name
    });
  } catch (e) {
    res.status(500).json({ message: "Internal Server error." });
    console.log("ERROR:", e.message);
  }
};

exports.createProject = async (req, res) => {
  try {
    const { error } = validateProject(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { name, workspaceId, startDate, dueDate } = req.body;

    const project = await Project.findOne({
      name: {
        $regex: new RegExp(name, "i")
      },
      workspaceId
    });
    if (project) {
      const workspace = await Workspace.findOne({ _id: workspaceId });
      return res
        .status(200)
        .json({ message: name + " already exists in " + workspace.name });
    }
    const newProject = new Project({
      name,
      workspaceId,
      startDate,
      dueDate
    });
    await newProject.save();
    await Workspace.findByIdAndUpdate(
      { _id: workspaceId },
      { $push: { projects: newProject._id } }
    );
    console.log(`${newProject.startDate}`);
    res.status(201).json({
      name: newProject.name,
      workspaceId: newProject.workspaceId,
      startDate: newProject.startDate,
      dueDate: newProject.dueDate
    });
  } catch (e) {
    res.status(500).json({ message: "Internal Server error." });
    console.log("ERROR:", e.message);
  }
};

exports.createTask = async (req, res) => {
  try {
    const { error } = validateTask(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { name, projectId, startDate, dueDate, userId, priority } = req.body;

    const task = await Task.findOne({
      name: {
        $regex: new RegExp(name, "i")
      },
      projectId
    });
    console.log("123");
    //console.log(task);
    if (task && task.projectId) {
      console.log("456");
      const project = await Project.findOne({ _id: projectId });
      return res
        .status(409)
        .json({ message: name + " already exists in project " + project.name });
    }
    console.log("xyz");
    const task1 = await Task.findOne({
      name: {
        $regex: new RegExp(name, "i")
      },
      userId
    });
    if (task1 && task1.userId) {
      console.log("abc");
      const user = await User.findOne({ _id: userId });
      return res
        .status(409)
        .json({ message: name + " already assigned to " + user.name });
    }
    const newTask = new Task({
      name,
      projectId,
      startDate,
      dueDate,
      userId,
      priority
    });
    await newTask.save();
    if (projectId) {
      await Project.findByIdAndUpdate(
        { _id: projectId },
        { $push: { tasks: newTask._id } }
      );
    }
    if (userId) {
      await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { tasks: newTask._id } }
      );
    }
    res.status(201).json({
      newTask
    });
  } catch (e) {
    res.status(500).json({ message: "Internal Server error." });
    console.log("ERROR:", e.message);
  }
};

exports.createUser = async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password, name } = req.body;

    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(200).json({ message: "Email already taken" });
    }

    const newUser = new User({
      name,
      email,
      password
    });

    await newUser.save();

    res.status(201).json({
      email: newUser.email,
      name: newUser.name
    });
  } catch (e) {
    res.status(500).json({ message: "Internal Server error." });
    console.log("ERROR:", e.message);
  }
};

exports.createTeam = async (req, res) => {
  try {
    const { error } = validateTeam(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { members, projects, name } = req.body;

    const team = await Team.findOne({
      name: {
        $regex: new RegExp(name, "i")
      }
    });
    if (team) {
      return res.status(200).json({ message: name + " already exists" });
    }

    const newTeam = new Team({
      members,
      projects,
      name
    });
    console.log(newTeam);
    await newTeam.save();
    const projectAlreadyAssigned = [];
    for (let i = 0; i < projects.length; i++) {
      const project = await Project.findOne({ _id: projects[i] });
      console.log(project);
      if (!project.teamId) {
        console.log("123");
        await Project.findByIdAndUpdate(
          { _id: projects[i] },
          { teamId: newTeam._id }
        );
      } else {
        projectAlreadyAssigned.push(project.name);
      }
    }
    for (let i = 0; i < members.length; i++) {
      await User.findByIdAndUpdate(
        { _id: members[i] },
        { $push: { teams: newTeam._id, projects: projects } }
      );
    }
    res.status(201).json({
      members: newTeam.members,
      name: newTeam.name,
      projects: newTeam.projects,
      projectAlreadyAssigned
    });
  } catch (e) {
    res.status(500).json({ message: "Internal Server error." });
    console.log("ERROR:", e.message);
  }
};
