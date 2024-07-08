// require express route
const route = require("express").Router();
// require user controller
const controller = require("../controllers/userController");
// require middleware
const { Jwt, Validate } = require("../middleware");
// require validations
const validateUser = require("../validations/user");

// route of get all Users
route.get("/", [Jwt], controller.getUsers);

// route of get one Users
route.get("/:id", [Jwt, validateUser.userId, Validate], controller.getOneUser);

// route of create Users
route.post(
  "/register",
  [validateUser.userRegister, Validate],
  controller.registerUser
);

// route of update Users
route.put(
  "/update/:userid",
  [Jwt, validateUser.userUpdate, validateUser.userId, Validate],
  controller.updateUser
);

// route of delete Users
route.delete("/delete", [Jwt], controller.deleteUser);

// exports route
module.exports = route;
