const mongoose = require("mongoose");
const Application = require("../model/application");
const Job = require("../model/job");
const User = require("../model/user");

class ApplicationService {
 
  static async getApplications(query) {
   
    let response = {};
    let statusCode = 200;
    try {
      
      const limit = query.limit || 10;
      const skip = query.skip || 10;

      
      const data = await Application.find().limit(limit).skip(skip).lean();

     
      statusCode = 200;
      response.data = data;
    } catch (error) {
      
      statusCode = 500;
      response.message = error.message;
    }
  
    return { statusCode, response };
  }

  
  static async getAllApplicationForSpecificCompanyToSpecificJob(
    userCompanyId,
    jobId
  ) {
   
    let response = {};
    let statusCode = 200;
    try {
    
      const data = await Application.find({ jobId })
        .populate([
          { path: "userId", match: {} },
          { path: "jobId", match: { addedBy: userCompanyId } },
        ])
        .lean();
     
      statusCode = 200;
      response.data = data;
    } catch (error) {
     
      statusCode = 500;
      response.message = error.message;
    }
   
    return { statusCode, response };
  }

  static async getCompanyApplication(userCompanyId) {
   
    let response = {};
    let statusCode = 200;
    try {
      const jobs = await Job.find({ addedBy: userCompanyId }, "");
      const ids = jobs.map((job) => job._id);
      
      const data = await Application.find({ jobId: { $in: ids } })
        .populate([
          { path: "userId", match: {}, model: User },
          { path: "jobId", match: {}, model: Job },
        ])
        .lean();
        
      statusCode = 200;
      response.data = data;
    } catch (error) {
      
      statusCode = 500;
      response.message = error.message;
    }
    
    return { statusCode, response };
  }

  /**
   * create Application
   * @param {name String} body
   */
  static async createApplication(body, user) {
    
    let response = {};
    let statusCode = 200;
    try {
      const job = await Job.findOne({ _id: body.jobId }).lean();
      if (user._id == job.addedBy) {
        
        statusCode = 403;
        response.message = `job not found or not allowed`;
      } else {
        
        const newApplication = new Application({
          userTechSkills: body.userTechSkills,
          userSoftSkills: body.userSoftSkills,
          userId: body.userId,
          jobId: body.jobId,
        });
        const saveApplication = await newApplication.save();
        
        if (saveApplication) {
          
          statusCode = 201;
          response.message = "added";
          response.data = saveApplication;
        }
      }
    } catch (error) {
      
      statusCode = 500;
      response.message = error.message;
    }
    
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
    
    let response = {};
    let statusCode = 200;
    try {
      
      const application = await Application.findOne({
        _id: applicationId,
      });
      
      if (!application || application.userId != userId) {
        
        statusCode = 404;
        response.message = "Application is not found or not for this user";
      } else {
        
        await Application.findOneAndUpdate(
          { _id: application._id },
          { $set: { ...body } },
          { new: true }
        );

        
        statusCode = 200;
        response.message = "updated";
      }
    } catch (error) {
      
      statusCode = 500;
      response.message = error.message;
    }
    
    return { statusCode, response };
  }

  /**
   * delete Application data
   * @param { applicationId String} body
   */
  static async deleteApplication(applicationId) {
    
    let response = {};
    let statusCode = 200;
    try {
      
      const applicationsData = await Application.findOne({
        _id: applicationId,
      });
      
      if (!applicationsData) {
        
        statusCode = 404;
        response.message = "Applications is not found";
        
      } else {
        
        await Application.deleteOne({ _id: applicationId });

        
        statusCode = 200;
        response.message = "deleted";
      }
    } catch (error) {
      
      statusCode = 500;
      response.message = error.message;
    }
    
    return { statusCode, response };
  }
}

module.exports = ApplicationService;
