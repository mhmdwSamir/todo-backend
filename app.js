//connection db
require("dotenv").config();
require("./core/db/db")();
const express = require("express");
const app = express();
const cors = require("cors");
const taskRouter = require("./routes/task.router");
const userRouter = require("./routes/user.router");
//For JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/* routes */
// task route
app.use("/api", taskRouter);
// user route
app.use("/api", userRouter);

app.listen(parseInt(process.env.PORT), () => {
  console.info(` Server is live with port ${process.env.PORT}`);
});
