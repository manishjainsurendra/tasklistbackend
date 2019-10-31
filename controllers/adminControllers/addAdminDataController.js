const { Project } = require("../../models/project");
const { User } = require("../../models/user");
const { Team } = require("../../models/team");

exports.assignTeamToProject = async (req, res) => {
  try {
    if (!req.body || !req.body.teamId) {
      return res.status(400).json({ message: "No Team" });
    }
    const project = await Project.findOne({ _id: req.params.id });
    if (!project) {
      return res.status(400).json({ message: "No Project" });
    }
    const team = await Team.findById({ _id: req.body.teamId });
    console.log(team.members);
    if (!team) {
      return res.status(400).json({ message: "team does not exist" });
    }

    await Project.findByIdAndUpdate(req.params.id, req.body);
    await Team.findByIdAndUpdate(
      { _id: req.body.teamId },
      { $push: { projects: req.params.id } }
    );
    for (let i = 0; i < team.members.length; i++) {
      await User.findByIdAndUpdate(
        { _id: team.members[i] },
        { $push: { projects: req.params.id } }
      );
    }
    res.status(200).json({
      project
    });
  } catch (e) {
    res.status(500).json({ message: "Internal Server error." });
    console.log("ERROR:", e.message);
  }
};

exports.addMemberToTeam = async (req, res) => {
  try {
    if (!req.body || !req.body.members || req.body.members.length == 0) {
      return res.status(400).json({ message: "No Members to Add" });
    }
    const id = req.params.id;
    const team = await Team.findOne({ _id: id });
    if (!team) {
      return res.status(400).json({ message: "Team does not exists" });
    }
    const members = req.body.members;
    for (let i = 0; i < members.length; i++) {
      const team = await Team.findById({ _id: id });
      if (team.members.indexOf(members[i]) != -1) {
        members.splice(i, 1);
        i--;
      }
    }
    await Team.findByIdAndUpdate(
      { _id: id },
      { $push: { members: { $each: members } } }
    );

    for (let i = 0; i < members.length; i++) {
      await User.findByIdAndUpdate(
        { _id: members[i] },
        { $push: { projects: { $each: team.projects } } }
      );
    }
    res.status(200).json({
      message: "users added"
    });
  } catch (e) {
    res.status(500).json({ message: "Internal Server error." });
    console.log("ERROR:", e.message);
  }
};
