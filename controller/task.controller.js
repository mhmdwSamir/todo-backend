const Task = require("../models/task.model");
const Exception = require("../core/helpers/Exception");
const { http_status_code } = require("../core/helpers/http_status_code");

module.exports = {
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
};
