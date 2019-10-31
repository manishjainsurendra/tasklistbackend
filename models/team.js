const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const validateTeam = team => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    members: Joi.array().required(),
    projects: Joi.array().required()
  });
  return Joi.validate(team, schema);
};

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  projects: [{ type: mongoose.Schema.ObjectId, ref: "project" }],
  members: [{ type: mongoose.Schema.ObjectId, ref: "user" }]
});

const Team = mongoose.model("team", teamSchema);

module.exports = { validateTeam, Team };
