const mongoose = require("mongoose");
const Job = require("../model/job");
const User = require("../model/user");

class JobService {
  static async createJob(inputDTO, user) {
    let statusCode = 200;
    let response = {};
    try {
        
        
      if (user.role != 'COMPANY_HR') {
        
        statusCode = 404;
        response.message = `user not found or not allowed`;
      } else {
      const newJob = new Job({
        jobTitle: inputDTO.jobTitle,
        jobLocation: inputDTO.jobLocation,
        workTime: inputDTO.workTime,
        seniorityLevel: inputDTO.seniorityLevel,
        jobDescription: inputDTO.jobDescription,
        technicalSkills: inputDTO.technicalSkills,
        softSkills: inputDTO.softSkills,
        addedBy: inputDTO.addedBy,
      });

      const job = await newJob.save();
      statusCode = 201;
      response.data = [job];}
    } catch (error) {
      statusCode = 500;
      response.message = error.message;
    }
    return { statusCode, response };
  }
}

module.exports = JobService;
