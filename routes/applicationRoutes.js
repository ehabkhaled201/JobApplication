
const route = require('express').Router();

const controller = require('../controllers/applicationController');

const { Jwt } = require('../middleware');


route.get('/', [
    Jwt,
], controller.getApplications);


route.get('/:adminId', [
    Jwt,
], controller.getAllApplicationForSpecificCompanyToSpecificJob);


route.post('/:jobId', [
    Jwt,
], controller.createApplication);


route.get('/company/application/', [
    Jwt,
], controller.getCompanyApplication);


route.put('/update/:applicationId', [
    Jwt,
], controller.updateApplication);


route.put('/delete/:applicationId', [
    Jwt,
], controller.deleteApplication);


module.exports = route;