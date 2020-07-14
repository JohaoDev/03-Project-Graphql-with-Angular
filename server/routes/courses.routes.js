const express = require("express");

let api = express.Router(),
  courseController = require("../controllers/courses.controller"),
  authController = require("../controllers/middlewares/auth.controller");

//users ENDPOINT
api.get("/courses", authController.auth, courseController.get);
api.get("/course/:_id", authController.auth, courseController.getByID);

api.post("/course", authController.auth, courseController.post);

api.patch("/course/:_id", authController.auth, courseController.patch);

api.delete("/course/:_id", authController.auth, courseController.deleteOne);

module.exports = api;
