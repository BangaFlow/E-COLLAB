const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  name: {
    type: String
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  tutors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subject"
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project"
  }
});

module.exports = Team = mongoose.model("team", TeamSchema);
