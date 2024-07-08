// require jwt
const jwt = require("jsonwebtoken");
// require secret from config
const secret = process.env.JWT_SECETE;
const User = require("../model/user");
const { default: mongoose } = require("mongoose");

const isAuthenticated = async (req, res, next) => {
  // get token from header
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : null;
  // check if it has token
  if (token) {
    try {
      // verify token to sure if give user data
      const decoded = await jwt.verify(token, secret);
      // sure if this user make logout from system before
      const data = await User.findOne({
        _id: decoded._id,
      });
      if (!data) {
        return res.status(401).json({
          success: false,
          message: "token you passed is expire",
        });
      } else {
        // put token in req
        req.token = token;
        // put data from decoded to req
        req.user = decoded;
        next();
      }
    } catch (err) {
      // return status error and message in not verify
      return res.status(401).json({
        success: false,
        message: "token you passed is expire",
      });
    }
  } else {
    // return status error and message in no token
    return res.status(401).json({
      success: false,
      message: "no token to passed",
    });
  }
};

module.exports = isAuthenticated;
