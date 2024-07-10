
const route = require("express").Router();

const controller = require("../controllers/userController");

const { Jwt, Validate } = require("../middleware");

const validateUser = require("../validations/user");


route.get("/", [Jwt], controller.getUsers);


route.get("/:id", [Jwt, validateUser.userId, Validate], controller.getOneUser);


route.post(
  "/register",
  [validateUser.userRegister, Validate],
  controller.registerUser
);


route.put(
  "/update/:userid",
  [Jwt, validateUser.userUpdate, validateUser.userId, Validate],
  controller.updateUser
);


route.delete("/delete", [Jwt], controller.deleteUser);


module.exports = route;
