const express = require("express");
const router = express.Router();
const taskController = require("../controller/task.controller");

router.post("/addTask", taskController.addTask);
router.get("/getAllTasks", taskController.getAllTasks);

module.exports = router;
