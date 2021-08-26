require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const taskController = require("../controller/task.controller");
const require_auth = require("../core/middlewares/require-auth-middleware");

router.post("/addTask", taskController.addTask);
router.get("/getAllTasks", taskController.getAllTasks);
// router.get("/getAllTasks", require_auth, taskController.getAllTasks);
router.get("/getCompletedTasks", taskController.getCompletedTasks);

router.get("/getActiveTasks", taskController.getActiveTasks);
router.delete("/deleteTask/:id", taskController.deleteTaskById);
router.delete("/deleteAllTasks", taskController.deleteCompletedTasks);

module.exports = router;
