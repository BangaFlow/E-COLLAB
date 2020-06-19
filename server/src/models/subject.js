const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
  name: {
    type: String
  }
});

module.exports = Subject = mongoose.model("subject", SubjectSchema);
