const Task = require("../models/task.model");
const Exception = require("../core/helpers/Exception");
const { http_status_code } = require("../core/helpers/http_status_code");
module.exports = {
  getAllTasks: async (req, res) => {
    try {
      let tasks = await Task.find();
      // here check for some scenario
      if (tasks.length == 0) {
        throw new Exception(
          "No Tasks for wright now , Add One ! or No Tasks with the given criteria",
          http_status_code.NOT_FOUND,
          "NOCONTN787"
        );
      }
      res.send(tasks);
    } catch ({ message, statusCode }) {
      res.status(statusCode).send(message);
    }
  },
  // duplication for code HERE

  getCompletedTasks: async (req, res) => {
    try {
      let tasks = await Task.find({
        completed: req.query.completed == "true",
      });
      res.send(tasks);
    } catch (error) {
      res.status(404).send(error);
    }
  },
  getActiveTasks: async (req, res) => {
    try {
      let tasks = await Task.find({
        completed: req.query.completed == "false",
      });
      res.send(tasks);
    } catch (error) {
      res.status(404).send(error);
    }
  },

  addTask: async (req, res) => {
    try {
      // get all task feild
      let { content, completed } = req.body;
      // validate it
      if (!content)
        throw new Exception(
          "content  must be provided ",
          http_status_code.BadRequest,
          "BadxxR"
        );
      // create task with req body and save it in db
      let task = new Task({ content, completed });
      task = await task.save();
      // response with message
      res.send({
        status: " Success ",
        statusCode: http_status_code.Created,
        data: task,
      });
    } catch ({ message, statusCode, codeException }) {
      res.status(statusCode).send({
        status: "Fail",
        Error: message,
        statusCode: statusCode,
        codeException: codeException,
      });
    }
  },
  deleteTaskById: async (req, res) => {
    try {
      // get id of task to delete
      let _id = req.params.id;
      console.log(_id);
      // handle case if no id was provided
      if (!_id)
        throw new Exception(
          "No Id Provided",
          http_status_code.BadRequest,
          "55JHui"
        );
      let task = await Task.findById(_id);
      if (!task)
        throw new Exception(
          "No Task with the given Id ",
          http_status_code.NoContent,
          "JLVK58"
        );
      task = await Task.findByIdAndDelete(_id);
      res.send({ deletedTask: task, message: "deleted Successfully" });
    } catch (err) {
      res.send(err);
    }
  },
  deleteCompletedTasks: async (req, res) => {
    try {
      let tasks = await Task.deleteMany({
        completed: true,
      });

      res.send({
        state: " Deleted Success ",
        deletedCount: tasks.deletedCount + ` Record `,
      });
    } catch (error) {
      res.status(404).send(error);
    }
  },
};
