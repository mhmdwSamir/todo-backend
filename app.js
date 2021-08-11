const express = require("express");
const app = express();
const { conectDb } = require("./db");
const taskRouter = require("./routes/task.router");

// connection to db
conectDb();

//For JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api", taskRouter);

app.listen(3000, () => {
  console.info("Server is live with port 3000");
});
