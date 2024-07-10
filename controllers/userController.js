
const User = require('../classes/User');


exports.getUsers = async (req, res) => {
    
    const result = await User.getUsers(req.query);
    
    return res.status(result.statusCode).json(result.response);
}


exports.getOneUser = async (req, res) => {
    
    const result = await User.getOneUser(req.params.id);
    
    return res.status(result.statusCode).json(result.response);
}


exports.registerUser = async (req, res) => {
    
    const result = await User.registerUser(req.body);
    console.log("here", result)
    
    return res.status(result.statusCode).json(result.response);
}


exports.updateUser = async (req, res) => {
    
    const result = await User.updateUser(req.params.userid, req.body);
    
    return res.status(result.statusCode).json(result.response);
}


exports.deleteUser = async (req, res) => {
    
    const result = await User.deleteUser(req.params.userId);
    
    return res.status(result.statusCode).json(result.response);
}