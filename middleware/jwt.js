
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECETE;
const User = require("../model/user");
const { default: mongoose } = require("mongoose");

const isAuthenticated = async (req, res, next) => {
  
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : null;
  
  if (token) {
    try {
      
      const decoded = await jwt.verify(token, secret);
      
      const data = await User.findOne({
        _id: decoded._id,
      });
      if (!data) {
        return res.status(401).json({
          success: false,
          message: "token you passed is expire",
        });
      } else {
        
        req.token = token;
        
        req.user = decoded;
        next();
      }
    } catch (err) {
      
      return res.status(401).json({
        success: false,
        message: "token you passed is expire",
      });
    }
  } else {
    
    return res.status(401).json({
      success: false,
      message: "no token to passed",
    });
  }
};

module.exports = isAuthenticated;
