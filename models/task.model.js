const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
// const User = require("../models/user.model");
const taskSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  date: {
    default: Date.now(),
    type: Date,
  },
  rate: {
    required: false,
    type: Number,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "User",
  },
  completed: Boolean,
});

module.exports = model("Task", taskSchema);
