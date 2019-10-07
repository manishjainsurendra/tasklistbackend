const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const validateProject = project => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    startDate: Joi.date().required(),
    dueDate: Joi.date().required(),
    workspaceId: Joi.string().required()
  });
  return Joi.validate(project, schema);
};

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  teamId: { type: mongoose.Schema.ObjectId, ref: "team" },
  startDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  workspaceId: { type: mongoose.Schema.ObjectId, ref: "workspace" },
  flag: { type: String },
  tasks: [{ type: mongoose.Schema.ObjectId, ref: "task" }]
});

const Project = mongoose.model("project", projectSchema);

module.exports = { validateProject, Project };
