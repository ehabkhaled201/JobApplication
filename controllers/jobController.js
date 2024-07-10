
const Job = require("../classes/Job");


exports.createJob = async (req, res) => {
  
  req.body.addedBy = req.user._id;
  const result = await Job.createJob(req.body, req.user);
  
  return res.status(result.statusCode).json(result.response);
};
