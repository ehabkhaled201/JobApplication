
const route = require("express").Router();

const controller = require("../controllers/jobController");

const { Jwt } = require("../middleware");


route.post("/", [Jwt], controller.createJob);


module.exports = route;
