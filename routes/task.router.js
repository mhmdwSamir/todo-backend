const express = require("express");
const router = express.Router();
const taskController = require("../controller/task.controller");

router.post("/addTask", taskController.addTask);
router.get("/getAllTasks", taskController.getAllTasks);
router.get("/getCompletedTasks", taskController.getCompletedTasks);
router.get("/getActiveTasks", taskController.getActiveTasks);
router.delete("/deleteTask/:id", taskController.deleteTaskById);

module.exports = router;
