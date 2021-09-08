require("dotenv").config();
const jwt = require("jsonwebtoken");
const Exception = require("../helpers/Exception");
const { http_status_code } = require("../helpers/http_status_code");
const User = require("../../models/user.model");
module.exports = async (req, res, next) => {
  try {
    // get the token fron request header
    let token = req.headers.authorization;
    // check if there is a token
    if (!token) {
      throw new Exception(
        "You Must login before  getting access to it  ",
        http_status_code.Unauthorized,
        "UnFSF5165"
      );
    }
    // verfiy it using jwt.
    let userPayload = jwt.verify(token, process.env.APP_SECRET_KEY);
    // get the user from his payload
    const user = await User.findById(userPayload.id);
    // attach aproperty to req called user with current User
    req.user = user;
    next();
  } catch (ex) {
    res.status(401).send({
      message: " UnAutorized to aceess this route you must login first  ",
    });
  }
};
