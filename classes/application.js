const mongoose = require("mongoose");
const Application = require("../model/application");
const Job = require("../model/job");
const User = require("../model/user");
// create class Application for all Application operations
class ApplicationService {
  /**
   * get all Application data
   * @param {limit Int,skip Int} query
   */
  static async getApplications(query) {
    // init stat for response
    let response = {};
    let statusCode = 200;
    try {
      // get form  query params limit and skip
      const limit = query.limit || 10;
      const skip = query.skip || 10;

      // get all data Applications and use limit and skip for pagenate it
      const data = await Application.find().limit(limit).skip(skip).lean();

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
   * get One Application data
   * @param {id Int} adminId
   */
  static async getAllApplicationForSpecificCompanyToSpecificJob(
    userCompanyId,
    jobId
  ) {
    // init stat for response
    let response = {};
    let statusCode = 200;
    try {
      // get one Application data
      const data = await Application.find({ jobId })
        .populate([
          { path: "userId", match: {} },
          { path: "jobId", match: { addedBy: userCompanyId } },
        ])
        .lean();
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
   * get One Application data
   * @param {id Int} adminId
   */
  static async getCompanyApplication(userCompanyId) {
    // init stat for response
    let response = {};
    let statusCode = 200;
    try {
      const jobs = await Job.find({ addedBy: userCompanyId }, "");
      const ids = jobs.map((job) => job._id);
      // get one Application data
      const data = await Application.find({ jobId: { $in: ids } })
        .populate([
          { path: "userId", match: {}, model: User },
          { path: "jobId", match: {}, model: Job },
        ])
        .lean();
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
   * create Application
   * @param {name String} body
   */
  static async createApplication(body, user) {
    // init stat for response
    let response = {};
    let statusCode = 200;
    try {
      const job = await Job.findOne({ _id: body.jobId }).lean();
      if (user._id == job.addedBy) {
        // change status to 404 not found and return message error
        statusCode = 403;
        response.message = `job not found or not allowed`;
      } else {
        // insert data new application in applications table
        const newApplication = new Application({
          userTechSkills: body.userTechSkills,
          userSoftSkills: body.userSoftSkills,
          userId: body.userId,
          jobId: body.jobId,
        });
        const saveApplication = await newApplication.save();
        // check if complete
        if (saveApplication) {
          // change status to 201 created and return data Application
          statusCode = 201;
          response.message = "added";
          response.data = saveApplication;
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
   * update Application data
   * @param {id Int} ApplicationId
   * @param {
   *  name String,
   * } body
   */
  static async updateApplication(applicationId, userId, body) {
    // init stat for response
    let response = {};
    let statusCode = 200;
    try {
      // get data Application in Applications table
      const application = await Application.findOne({
        _id: applicationId,
      });
      // check if complete
      if (!application || application.userId != userId) {
        // change status to 404 not found and return message error
        statusCode = 404;
        response.message = "Application is not found or not for this user";
      } else {
        // update Applications data
        await Application.findOneAndUpdate(
          { _id: application._id },
          { $set: { ...body } },
          { new: true }
        );

        // return status code and response message
        statusCode = 200;
        response.message = "updated";
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
   * delete Application data
   * @param { applicationId String} body
   */
  static async deleteApplication(applicationId) {
    // init stat for response
    let response = {};
    let statusCode = 200;
    try {
      // get applicatio data
      const applicationsData = await Application.findOne({
        _id: applicationId,
      });
      // check if complete
      if (!applicationsData) {
        // change status to 404 not found and return message error
        statusCode = 404;
        response.message = "Applications is not found";
        // return resolve data from Promise
      } else {
        // delete application
        await Application.deleteOne({ _id: applicationId });

        // return resolve data from Promise
        statusCode = 200;
        response.message = "deleted";
      }
    } catch (error) {
      // change status code to 500 server error and put message
      statusCode = 500;
      response.message = error.message;
    }
    // return  data from Promise
    return { statusCode, response };
  }
}

module.exports = ApplicationService;
