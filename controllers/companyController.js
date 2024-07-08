// require class Company
const CompanyService = require("../classes/company");

// export createCompany function
exports.createCompany = async (req, res) => {
  req.body.companyHR = req.user._id;
  // pass request body to createCompany function from class Company
  const result = await CompanyService.createCompany(req.body, req.user);
  // pass result statusCode to response status and pass data response to json
  return res.status(result.statusCode).json(result.response);
};
