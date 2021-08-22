require("dotenv").config();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const Exception = require("../core/helpers/Exception");
const { http_status_code } = require("../core/helpers/http_status_code");

module.exports = {
  signup: async (req, res) => {
    try {
      // get all user information
      let { userName, email, password } = req.body;
      // check for all feilds is founded
      if (!userName || !email || !password) {
        throw new Exception(
          "User name and email and password are mandatory feilds",
          http_status_code.BadRequest,
          "bad541JK"
        );
      }
      // check if the user already sign up before
      let userExist = await User.findOne({ email });

      if (userExist) {
        throw new Exception(
          "You are register ewith this Email",
          http_status_code.BadRequest,
          "566YJD58"
        );
      }

      let hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.SALT)
      );

      let user = new User({
        userName,
        email,
        password: hashedPassword,
      });

      user = await user.save();
      res.send(user);
    } catch (error) {
      res.status(error.statusCode || 500).send(error);
    }
  },
};
