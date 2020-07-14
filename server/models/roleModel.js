const mongoose = require("mongoose");

const { Schema } = mongoose;

const roleModel = Schema({
  name: { type: String },
  description: { type: String },
  createAt: { type: Date },
});

module.exports = mongoose.model("Role", roleModel);
