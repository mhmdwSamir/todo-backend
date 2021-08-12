const express = require("express");
const router = express.Router();
const taskController = require("../controller/task.controller");

router.post("/addTask", taskController.addTask);
router.get("/getAllTasks", taskController.getAllTasks);
router.delete("/deleteTask/:id", taskController.deleteTaskById);

module.exports = router;
