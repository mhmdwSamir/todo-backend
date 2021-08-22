require("dotenv").config();
const jwt = require("jsonwebtoken");
const Exception = require("../helpers/Exception");
const { http_status_code } = require("../helpers/http_status_code");
module.exports = (req, res, next) => {
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
    let tokenVerified = jwt.verify(token, process.env.APP_SECRET_KEY);
    console.log(" is token verfied ", tokenVerified);
    // check if the token is right and belong to OUR APP
    // append property with current user to request
    next();
  } catch (ex) {
    console.log(ex);
    res
      .status(401)
      .send(
        new Exception(
          "Something went wrong , try again or log in",
          http_status_code.Unauthorized,
          "DSDDF5165"
        )
      );
  }
};
