// require class Admin
const AuthLogin = require('../classes/AuthLogin');

// export getAdmins function 
exports.loginUser = async (req, res) => {
    // pass request query to loginUser function from class AuthLogin
    const result = await AuthLogin.loginUser(req.body);
    // pass result statusCode to response status and pass data response to json
    return res.status(result.statusCode).json(result.response);
}
