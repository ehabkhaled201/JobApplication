
const Application = require("../classes/application");


exports.getApplications = async (req, res) => {
  
  const result = await Application.getApplications(req.query);
  
  return res.status(result.statusCode).json(result.response);
};


exports.getAllApplicationForSpecificCompanyToSpecificJob = async (req, res) => {
  
  const result =
    await Application.getAllApplicationForSpecificCompanyToSpecificJob(
      req.params.adminId,
      req.query.jobId
    );
  
  return res.status(result.statusCode).json(result.response);
};


exports.getCompanyApplication = async (req, res) => {
  
  const result = await Application.getCompanyApplication(req.user._id);
  
  return res.status(result.statusCode).json(result.response);
};


exports.createApplication = async (req, res) => {
  req.body.userId = req.user._id;
  req.body.jobId = req.params.jobId;

  
  const result = await Application.createApplication(req.body, req.user);
  
  return res.status(result.statusCode).json(result.response);
};


exports.updateApplication = async (req, res) => {
  
  const result = await Application.updateApplication(
    req.params.applicationId,
    req.body
  );
  
  return res.status(result.statusCode).json(result.response);
};


exports.deleteApplication = async (req, res) => {
  
  const result = await deleteApplication.deleteApplication(
    req.params.applicationId
  );
  
  return res.status(result.statusCode).json(result.response);
};
