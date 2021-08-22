require("dotenv").config();
const jwt = require("jsonwebtoken");
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
      res.send({ user });
    } catch (error) {
      res.status(error.statusCode || 500).send(error);
    }
  },

  logIn: async (req, res) => {
    try {
      //get user info from req body
      let { email, password } = req.body;
      // check if there is a user with this email
      let userExist = await User.findOne({ email });
      // if no user With the email , throw error
      if (!userExist) {
        throw new Exception(
          "Please Sign Up firest befor log in  ",
          http_status_code.BadRequest,
          "lhfd54TYG"
        );
      }
      // compare real password if the user exist with the entered password
      let passwordMatched = await bcrypt.compare(password, userExist.password);
      // IF PASSWORD DIDNOT MATCH
      if (!passwordMatched) {
        throw new Exception(
          "Email or password May be Incorrect",
          http_status_code.BadRequest,
          "JKS6lk"
        );
      }
      // create token for user
      let token = jwt.sign({ id: userExist._id }, process.env.APP_SECRET_KEY);
      // let the user logIn
      res.send({ userExist, token });
    } catch (error) {
      res.status(error.statusCode).send(error);
    }
  },
};
