// require class Company
const Job = require("../classes/Job");

// export createJob function
exports.createJob = async (req, res) => {
  // pass request body to createJob function from class Company
  req.body.addedBy = req.user._id;
  const result = await Job.createJob(req.body, req.user);
  // pass result statusCode to response status and pass data response to json
  return res.status(result.statusCode).json(result.response);
};
