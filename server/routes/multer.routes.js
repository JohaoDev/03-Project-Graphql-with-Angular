const express = require("express"),
  multer = require("multer");

let api = express.Router(),
  multerController = require("../controllers/multer.controller"),
  upload = multer({ dest: "./files" });

//multer ENDPOINT
api.get("/file", multerController.getFiles);
api.post("/file", upload.single("file"), multerController.saveFile);
// api.patch("/file/:id", authController.auth, userController.patchUser);
// api.delete("/file/:id", authController.auth, userController.deleteUser);

module.exports = api;
