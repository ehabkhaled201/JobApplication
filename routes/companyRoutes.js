
const route = require("express").Router();

const controller = require("../controllers/companyController");

const { Jwt } = require("../middleware");


route.post("/", [Jwt], controller.createCompany);


module.exports = route;
