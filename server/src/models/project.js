const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  number_of_teams: {
    type: Number
  },
  number_of_members: {
    type: Number
  },
  tutors_involved: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  number_of_tutors_per_team: {
    type: Number
  },
  learners_involved: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subject"
    }
  ]
});

module.exports = Project = mongoose.model("project", ProjectSchema);
