const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  image: {
    type: String
  },
  title: {
    type: String
  },
  location: {
    type: String
  },
  phone: {
    type: String,
  },
  about: {
    type: String
  },
  skills: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "skill"
      }
    ]
  },
  github_username: {
    type: String
  },
  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "team"
    }
  ]
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
