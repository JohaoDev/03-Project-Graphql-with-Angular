const mongoose = require("mongoose");

const { Schema } = mongoose;

const courseModel = Schema({
  title: { type: String },
  professor: { type: String },
  description: { type: String },
  topic: { type: String },
  participants: { type: Array },
  sessionID: { type: String },
  createAt: { type: Date },
});

module.exports = mongoose.model("Course", courseModel);
