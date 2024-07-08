// require jwt
const jwt = require("jsonwebtoken");
// require bcryptjs
const bcryptjs = require("bcryptjs");
// require config
const config = require("config");
const User = require("../model/user");

class AuthService {
  /**
   *
   * @param {*} body
   */
  static async loginUser(body) {
    // init stat for response
    let response = {};
    let statusCode = 200;
    try {
      // get some data from body
      const { email, password } = body;
      // create viriable empty
      let user;
      let col;
      // get data of user by email
      const userData = await User.findOne({ email }).lean();
      // check if user is empty or not
      if (!userData) {
        // change status to 404 not found and return message error
        statusCode = 404;
        response.message = `no data for this user please check true ${col}`;
      } else {
        // verify Password and compare two password from user and request
        const verifyPassword = await bcryptjs.compare(password, userData.password);
        // check if is two password is matched
        if (!verifyPassword) {
          // change status to 404 not found and return message error
          statusCode = 404;
          response.message = `password is not correct please check true`;
        } else {
          // create token wirh data of user and secret
          const token = jwt.sign(userData, process.env.JWT_SECETE, {
            expiresIn: "1h",
          });

          // return status code and response message
          statusCode = 200;
          delete userData.password;
          response.data = { user: userData, token: token };
        }
      }
    } catch (error) {
      // change status code to 500 server error and put message
      statusCode = 500;
      response.data = error;
      response.message = error.message;
    }
    // return status code and response data
    return { statusCode, response };
  }
}

module.exports = AuthService;
