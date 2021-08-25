const { Schema, model } = require("mongoose");
const taskSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  date: {
    default: Date.now(),
    type: Date,
  },
  completed: Boolean,
});

module.exports = model("Task", taskSchema);
