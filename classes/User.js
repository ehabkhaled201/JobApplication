const User = require("../model/user");
const Application = require("../model/application");

const bcryptjs = require("bcryptjs");


class UserService {
  /**
   *
   * @param {limit, skip } query
   */
  static async getUsers(query) {
    
    let response = {};
    let statusCode = 200;
    try {
      
      const limit = query.limit || 10;
      const skip = query.skip || 10;

      
      const data = await User.findOne({});

      
      statusCode = 200;
      response.data = data;
    } catch (error) {
      
      statusCode = 500;
      response.message = error.message;
    }
    
    return { statusCode, response };
  }

  /**
   * get One User data
   * @param {id Int} UserId
   */
  static async getOneUser(userId) {
    
    let response = {};
    let statusCode = 200;
    try {
      
      const data = await User.findOne({ _id: userId });
      
      statusCode = 200;
      response.data = data;
    } catch (error) {
      
      statusCode = 500;
      response.message = error.message;
    }
    
    return { statusCode, response };
  }

  /**
   * create User
   * @param {
   *  firstName String,
   *  lastName String,
   *  username String,
   *  email String,
   *  password String
   * } body
   */
  static async registerUser(body) {
    
    let response = {};
    let statusCode = 200;
    try {
      
      const encryptPassword = await bcryptjs.hash(body.password, 12);

      
      body.password = encryptPassword;
      
      const existUser = await User.findOne({ mobileNumber: body.mobileNumber });
      
      if (existUser) {
        
        statusCode = 403;
        response.message = "exist User";
      } else {
        
        const newUser = new User({ ...body });
        await newUser.save();

        
        if (newUser) {
          
          statusCode = 201;
          response.message = "new User ok";
        } else {
          
          statusCode = 500;
          response.error = newUser.error;
        }
      }
    } catch (error) {
      
      statusCode = 500;
      response.message = error.message;
    }
    
    return { statusCode, response };
  }

  /**
   * delete User data
   * @param { userId string} body
   */
  static async deleteUser(userId) {
    
    let response = {};
    let statusCode = 200;
    try {
      
      const usersData = await User.findOne({ _id: userId });
      
      if (!usersData) {
        
        statusCode = 404;
        response.message = "Users is not found";
      } else {
        await Application.deleteOne({ _id: userId });
        await Application.deleteMany({ userId });

        
        statusCode = 200;
        response.message = "user data delete";
      }
      
    } catch (error) {
      
      statusCode = 500;
      response.message = error.message;
      
    }
    return { statusCode, response };
  }
}

module.exports = UserService;
