const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const validateProject = project => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    teamId: Joi.string().required(),
    startDate: Joi.date().required(),
    dueDate: Joi.date().required(),
    workspaceId: Joi.string().required()
  });
  return Joi.validate(project, schema);
};

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  teamId: { type: mongoose.Schema.ObjectId, ref: "team" },
  startDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  workspaceId: { type: mongoose.Schema.ObjectId, ref: "workspace" },
  flag: { type: String },
  taskList: [{ type: mongoose.Schema.ObjectId, ref: "task" }]
});

const Project = mongoose.model("project", projectSchema);

module.exports = { validateProject, Project };

Task;
const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const validateTask = task => {
  const schema = Joi.object().keys({
    assignedTo: Joi.string().required(),
    startDate: Joi.date().required(),
    dueDate: Joi.date().required(),
    priority: Joi.string().required(),
    projectId: Joi.string().required()
  });
  return Joi.validate(task, schema);
};

const taskSchema = new mongoose.Schema({
  assignedTo: [{ type: mongoose.Schema.ObjectId, ref: "user" }],
  startDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  projectId: { type: mongoose.Schema.ObjectId, ref: "project" },
  priority: { type: String, required: true },
  flag: { type: String },
  messageList: [{ type: mongoose.Schema.ObjectId, ref: "message" }]
});

const Task = mongoose.model("task", taskSchema);

module.exports = { validateTask, Task };
