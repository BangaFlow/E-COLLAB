const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  start_date: {
    type: Date,
  },
  end_date: {
    type: Date,
  },
  short_desc: {
    type: String
  },
  number_of_teams: {
    type: Number,
  },
  number_of_members: {
    type: Number,
  },
  tutors_involved: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  number_of_tutors_per_team: {
    type: Number,
  },
  learners_involved: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subject",
    },
  ],
  auto_generate_teams: {
    type: Boolean,
    default: false,
  },
  competence_generate_teams: {
    type: Boolean,
    default: false,
  },
  learners_choose_teams: {
    type: Boolean,
    default: false,
  },
  choose_date_limit: {
    start_choose_date: {
      type: Date,
    },
    end_choose_date: {
      type: Date,
    },
  },
});

module.exports = Project = mongoose.model("project", ProjectSchema);
