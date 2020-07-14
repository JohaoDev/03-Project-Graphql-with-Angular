const express = require("express");

let api = express.Router(),
  roleController = require("../controllers/roles.controller"),
  authController = require("../controllers/middlewares/auth.controller");

//users ENDPOINT
api.get("/roles", authController.auth, roleController.get);
api.get("/role/:_id", authController.auth, roleController.getByID);

api.post("/role", authController.auth, roleController.post);

api.patch("/role/:_id", authController.auth, roleController.patch);

api.delete("/role/:_id", authController.auth, roleController.deleteOne);

module.exports = api;
