const User = require("../model/user");
const Application = require("../model/application");
// require bcryptjs
const bcryptjs = require("bcryptjs");

// create class User for all User operations
class UserService {
  /**
   *
   * @param {limit, skip } query
   */
  static async getUsers(query) {
    // init stat for response
    let response = {};
    let statusCode = 200;
    try {
      // get form  query params limit and skip
      const limit = query.limit || 10;
      const skip = query.skip || 10;

      // get all data Users and use limit and skip for pagenate it
      const data = await User.findOne({});

      // change status code and send data in response of data
      statusCode = 200;
      response.data = data;
    } catch (error) {
      // change status code to 500 server error and put message
      statusCode = 500;
      response.message = error.message;
    }
    // return status code and response data
    return { statusCode, response };
  }

  /**
   * get One User data
   * @param {id Int} UserId
   */
  static async getOneUser(userId) {
    // init stat for response
    let response = {};
    let statusCode = 200;
    try {
      // get one User data
      const data = await User.findOne({ _id: userId });
      // send data
      statusCode = 200;
      response.data = data;
    } catch (error) {
      // change status code to 500 server error and put message
      statusCode = 500;
      response.message = error.message;
    }
    // return status code and response data
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
    // init stat for response
    let response = {};
    let statusCode = 200;
    try {
      // encrecpt password
      const encryptPassword = await bcryptjs.hash(body.password, 12);

      // reasgin password or put it into body request
      body.password = encryptPassword;
      // select user id if is exist by User username or email
      const existUser = await User.findOne({ mobileNumber: body.mobileNumber });
      // check if existUser
      if (existUser) {
        // change status to 403 and return error
        statusCode = 403;
        response.message = "exist User";
      } else {
        // insert data new User in Users table
        const newUser = new User({ ...body });
        await newUser.save();

        // check if complete
        if (newUser) {
          // change status to 201 created and return data User
          statusCode = 201;
          response.message = "new User ok";
        } else {
          // change status to 500 and return error
          statusCode = 500;
          response.error = newUser.error;
        }
      }
    } catch (error) {
      // change status code to 500 server error and put message
      statusCode = 500;
      response.message = error.message;
    }
    // return status code and response data
    return { statusCode, response };
  }

  /**
   * delete User data
   * @param { userId string} body
   */
  static async deleteUser(userId) {
    // init stat for response
    let response = {};
    let statusCode = 200;
    try {
      // get data User in Users table
      const usersData = await User.findOne({ _id: userId });
      // check if complete
      if (!usersData) {
        // change status to 404 not found and return message error
        statusCode = 404;
        response.message = "Users is not found";
      } else {
        await Application.deleteOne({ _id: userId });
        await Application.deleteMany({ userId });

        // return status code and response message
        statusCode = 200;
        response.message = "user data delete";
      }
      // return resolve data from Promise
    } catch (error) {
      // change status code to 500 server error and put message
      statusCode = 500;
      response.message = error.message;
      // return resolve data from Promise
    }
    return { statusCode, response };
  }
}

module.exports = UserService;
