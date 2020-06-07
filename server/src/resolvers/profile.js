import { UserInputError } from "apollo-server-errors";

const Profile = require("../models/profile");

export default {
  Query: {
    getMyProfile: async (root, arg, { req }, info) => {
      let profile = await Profile.findOne({ user: req.session.userId });
      return profile;
    },
    getProfile: async (root, { id }, { req }, info) => {
      let profile = await Profile.findOne({ user: id });
      if (profile) {
        const teams = await Team.find();
        let user_teams = [];
        let index = 0;
        teams.forEach((team) => {
          if (team.members.indexOf(id) > -1) {
            user_teams[index] = team;
            index++;
          }
        });
        profile.teams = user_teams;
      }
      return profile;
    },
  },
  Mutation: {
    createProfile: async (
      root,
      { image, title, location, phone, about, github_username, user_id },
      { req },
      info
    ) => {
      let newProfile = new Profile();
      newProfile.user = user_id;
      newProfile.image = image;
      newProfile.title = title;
      newProfile.location = location;
      newProfile.phone = phone;
      newProfile.about = about;
      newProfile.github_username = github_username;
      if (newProfile) {
        const teams = await Team.find();
        let user_teams = [];
        let index = 0;
        teams.forEach((team) => {
          if (team.members.indexOf(id) > -1) {
            user_teams[index] = team;
            index++;
          }
        });
        profile.teams = user_teams;
      }
      return await newProfile.save();
    },

    updateMyProfile: async (
      root,
      { image, title, location, phone, about, github_username, profile_id },
      { req },
      info
    ) => {
      let profile = await Profile.findByIdAndUpdate(
        profile_id,
        {
          image,
          title,
          location,
          phone,
          about,
          github_username,
        },
        { new: true },
        (err, doc) => {
          if (err) {
            throw new Error("Something wrong when updating data!");
          }
        }
      );
      return profile;
    },
  },
  Profile: {
    user: async (profile, arg, context, info) => {
      return (await profile.populate("user").execPopulate()).user;
    },
    skills: async (profile, arg, context, info) => {
      return (await profile.populate("skills.skill").execPopulate()).skills;
    },
  },
};
