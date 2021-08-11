//connection db
require("./core/db/db")();
const express = require("express");
const app = express();
const taskRouter = require("./routes/task.router");

//For JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api", taskRouter);

app.listen(3000, () => {
  console.info("Server is live with port 3000");
});
