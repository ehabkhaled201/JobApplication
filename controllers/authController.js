
const AuthLogin = require('../classes/AuthLogin');


exports.loginUser = async (req, res) => {
    
    const result = await AuthLogin.loginUser(req.body);
    
    return res.status(result.statusCode).json(result.response);
}
