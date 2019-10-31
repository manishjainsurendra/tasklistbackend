const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const validateTask = task => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    startDate: Joi.date().required(),
    dueDate: Joi.date().required(),
    priority: Joi.number()
      .required()
      .min(1)
      .max(10),
    projectId: Joi.string(),
    userId: Joi.string()
  });
  return Joi.validate(task, schema);
};

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  projectId: { type: mongoose.Schema.ObjectId, ref: "project" },
  userId: { type: mongoose.Schema.ObjectId, ref: "user" },
  priority: { type: String, required: true },
  flag: { type: String },
  messages: [{ type: mongoose.Schema.ObjectId, ref: "message" }]
});

const Task = mongoose.model("task", taskSchema);

module.exports = { validateTask, Task };
