const express = require("express");
const router = express.Router();
const taskController = require("../controller/task.controller");

router.post("/addTask", taskController.addTask);

module.exports = router;
