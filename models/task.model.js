const { Schema, model } = require("mongoose");
const taskSchema = new Schema({
  content: String, // String is shorthand for {type: String}
  data: {
    default: Date.now(),
    type: Date,
  },
});

exports.Task = model("Tasks", taskSchema);
