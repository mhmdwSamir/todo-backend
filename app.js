const express = require("express");
const app = express();
const { conectDb } = require("./db");
const { Task } = require("./models/task.model");

// connection to db
conectDb();

new Task({ content: "that is my first task" }).save();

app.listen(3000, () => {
  console.info("Server is live with port 3000");
});
