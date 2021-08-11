const mongoose = require("mongoose");
const conectDb = async () => {
  await mongoose
    .connect("mongodb://localhost/todoapp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => {
      console.info("Data Base connected Successfully !!   ");
    })
    .catch(() => {
      console.error("Error");
    });
};
module.exports = conectDb;
// exports.conectDb = conectDb;
