const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = model("User", userSchema);
