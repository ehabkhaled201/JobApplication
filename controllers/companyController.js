
const CompanyService = require("../classes/company");


exports.createCompany = async (req, res) => {
  req.body.companyHR = req.user._id;
  
  const result = await CompanyService.createCompany(req.body, req.user);
  
  return res.status(result.statusCode).json(result.response);
};
