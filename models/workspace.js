const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const validateWorkspace = workspace => {
  const schema = Joi.object().keys({
    name: Joi.string().required()
  });
  return Joi.validate(workspace, schema);
};

const workspaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  projects: [{ type: mongoose.Schema.ObjectId, ref: "project" }],
  createdAt: { type: Date, default: Date.now }
});

const Workspace = mongoose.model("workspace", workspaceSchema);

module.exports = { validateWorkspace, Workspace };
