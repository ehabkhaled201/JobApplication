
const { validationResult } = require('express-validator');


const Validate = async (req, res, next) => {
    
    const { errors } = await validationResult(req);
    
    if(errors.length > 0){
        
        return res.status(400).json({
            'message': 'error in input',
            data :errors
        })
    }
    next();
}

module.exports = Validate;
