// require express route
const route = require('express').Router();
// require  controller 
const controller = require('../controllers/applicationController');
// require middleware 
const { Jwt } = require('../middleware');

// route of get Application
route.get('/', [
    Jwt,
], controller.getApplications);

// route of get userId Application
route.get('/:adminId', [
    Jwt,
], controller.getAllApplicationForSpecificCompanyToSpecificJob);

// route of create Application
route.post('/:jobId', [
    Jwt,
], controller.createApplication);

// route of get Application for company
route.get('/company/application/', [
    Jwt,
], controller.getCompanyApplication);

// route of update Application
route.put('/update/:applicationId', [
    Jwt,
], controller.updateApplication);

// route of delete Application 
route.put('/delete/:applicationId', [
    Jwt,
], controller.deleteApplication);

// exports route 
module.exports = route;