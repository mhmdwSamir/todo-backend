const Task = require("../models/task.model");
const Exception = require("../core/helpers/Exception");
const { http_status_code } = require("../core/helpers/http_status_code");
module.exports = {
  getAllTasks: async (req, res) => {
    let query = {};
    // filter
    if (req.query.content) {
      query = {
        content: {
          $regex: req.query.content,
          $options: "i",
        },
      };
    }
    // For sorting
    let sortQuery = {};
    if (req.query.sortBy) {
      sortFeild = req.query.sortBy;
      sortQuery = {
        [sortFeild]: "asc",
      };
    }
    // pagination
    let limit;
    let skip;
    if (req.query.limit && req.query.page) {
      limit = +req.query.limit; // 10
      skip = (+req.query.page - 1) * limit; // (5 -1)*10
    }
    try {
      // Now One has User attached to [ req.user ]
      let tasks = await Task.find(query)
        .sort(sortQuery)
        .skip(skip)
        .limit(limit);
      // count all Tasks
      let tasksLength = await Task.countDocuments();

      // here check for some scenario
      if (tasks.length == 0) {
        throw new Exception(
          "No Tasks Until Now , Add ONE right now",
          http_status_code.NOT_FOUND,
          "NOCONTN787"
        );
      }

      res.send({
        status: "OK , Success Operation",
        allTasksLength: tasksLength,
        data: tasks,
      });
    } catch ({ message, statusCode }) {
      res.status(statusCode || 500).send(message);
    }
  },

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
      let { content, completed, createdBy, rate } = req.body;
      // validate it
      if (!content)
        throw new Exception(
          "content  must be provided ",
          http_status_code.BadRequest,
          "BadxxR"
        );
      // create task with req body and save it in db
      let task = new Task({ content, completed, createdBy, rate });
      task = await task.save();
      // response with message
      res.send({
        status: " Success ",
        statusCode: http_status_code.Created,
        data: task,
      });
    } catch ({ message, statusCode, codeException }) {
      res.status(statusCode || 500).send({
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
