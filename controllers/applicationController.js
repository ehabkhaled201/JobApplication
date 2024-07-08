// require class Application
const Application = require("../classes/application");

// export getApplications function
exports.getApplications = async (req, res) => {
  // pass request query to getApplications function from class Application
  const result = await Application.getApplications(req.query);
  // pass result statusCode to response status and pass data response to json
  return res.status(result.statusCode).json(result.response);
};

// export getAllApplicationForSpecificCompanyToSpecificJob function
exports.getAllApplicationForSpecificCompanyToSpecificJob = async (req, res) => {
  // pass request params to getAllApplicationForSpecificCompanyToSpecificJob function from class Application
  const result =
    await Application.getAllApplicationForSpecificCompanyToSpecificJob(
      req.params.adminId,
      req.query.jobId
    );
  // pass result statusCode to response status and pass data response to json
  return res.status(result.statusCode).json(result.response);
};

// export getCompanyApplication function
exports.getCompanyApplication = async (req, res) => {
  // pass request params to getCompanyApplication function from class Application
  const result = await Application.getCompanyApplication(req.user._id);
  // pass result statusCode to response status and pass data response to json
  return res.status(result.statusCode).json(result.response);
};

// export createApplication function
exports.createApplication = async (req, res) => {
  req.body.userId = req.user._id;
  req.body.jobId = req.params.jobId;

  // pass request body to createApplication function from class Application
  const result = await Application.createApplication(req.body, req.user);
  // pass result statusCode to response status and pass data response to json
  return res.status(result.statusCode).json(result.response);
};

// export updateApplication function
exports.updateApplication = async (req, res) => {
  // pass request params and body to updateApplication function from class Application
  const result = await Application.updateApplication(
    req.params.applicationId,
    req.body
  );
  // pass result statusCode to response status and pass data response to json
  return res.status(result.statusCode).json(result.response);
};

// export deleteApplication function
exports.deleteApplication = async (req, res) => {
  // pass request query to deleteApplication function from class Application
  const result = await deleteApplication.deleteApplication(
    req.params.applicationId
  );
  // pass result statusCode to response status and pass data response to json
  return res.status(result.statusCode).json(result.response);
};
