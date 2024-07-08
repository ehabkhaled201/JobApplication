// require express route
const route = require("express").Router();
// require admin controller
const controller = require("../controllers/companyController");
// require middleware
const { Jwt } = require("../middleware");

// route of create Company
route.post("/", [Jwt], controller.createCompany);

// exports route
module.exports = route;
