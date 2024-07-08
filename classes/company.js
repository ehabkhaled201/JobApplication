const mongoose = require("mongoose");
const Company = require("../model/company");
const User = require("../model/user");

class CompanyService {
  static async createCompany(inputDTO, user) {
    let statusCode = 200;
    let response = {};
    try {
      // select role of user
      if (user.role != 'COMPANY_HR') {
        // change status to 404 not found and return message error
        statusCode = 403;
        response.message = `user not found or not allowed`;
      } else {
        const newCompany = new Company({
          companyName: inputDTO.companyName,
          companyEmail: inputDTO.companyEmail,
          description: inputDTO.description,
          industry: inputDTO.industry,
          numberOfEmployees: inputDTO.numberOfEmployees,
          address: inputDTO.address,
          companyHR: inputDTO.companyHR,
        });

        const company = await newCompany.save();
        statusCode = 201;
        response.data = [company];
      }
    } catch (error) {
      statusCode = 500;
      response.message = error.message;
    }
    return { statusCode, response };
  }
}

module.exports = CompanyService;
