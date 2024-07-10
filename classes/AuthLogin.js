
const jwt = require("jsonwebtoken");

const bcryptjs = require("bcryptjs");

const config = require("config");
const User = require("../model/user");

class AuthService {
  /**
   *
   * @param {*} body
   */
  static async loginUser(body) {
    
    let response = {};
    let statusCode = 200;
    try {
      
      const { email, password } = body;
      
      let user;
      let col;
      
      const userData = await User.findOne({ email }).lean();
      
      if (!userData) {
        
        statusCode = 404;
        response.message = `no data for this user please check true ${col}`;
      } else {
        
        const verifyPassword = await bcryptjs.compare(password, userData.password);
        
        if (!verifyPassword) {
          
          statusCode = 404;
          response.message = `password is not correct please check true`;
        } else {
          
          const token = jwt.sign(userData, process.env.JWT_SECETE, {
            expiresIn: "1h",
          });

          
          statusCode = 200;
          delete userData.password;
          response.data = { user: userData, token: token };
        }
      }
    } catch (error) {
      
      statusCode = 500;
      response.data = error;
      response.message = error.message;
    }
    
    return { statusCode, response };
  }
}

module.exports = AuthService;
