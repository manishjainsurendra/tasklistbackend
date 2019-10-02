const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const validateUser = user => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
  });
  return Joi.validate(user, schema);
};

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    teams: [{ type: mongoose.Schema.ObjectId, ref: "team" }],
    tasks: [{ type: mongoose.Schema.ObjectId, ref: "task" }],
    projects: [{ type: mongoose.Schema.ObjectId, ref: "project" }]
  },
  {
    timestamps: true
  }
);

userSchema.pre("save", async function(next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.isValidPassword = async function(newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch (err) {
    throw new Error(err);
  }
};

const User = mongoose.model("user", userSchema);

module.exports = { validateUser, User };
