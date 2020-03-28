import {UserInputError} from "apollo-server-errors";

//const _ = require('lodash');

const Profile = require("../models/profile");


export default {
    Query: {
        getMyProfile: (root, arg, {req}, info) => {
            return Profile.findOne({user: req.session.userId});
        }
    },
    Mutation: {
        createProfile: async (root, {phone, skills, bio, github_username}, {req}, info) => {
            let newProfile = new Profile();
            newProfile.user = req.session.userId;
            newProfile.bio = bio;
            newProfile.phone = phone;
            newProfile.github_username = github_username;
            newProfile.skills = skills;
            return await newProfile.save();
        },

        updateMyProfile: async (root, {phone, skills, bio, github_username, profile_id}, {req}, info) => {
            let myProfile = await Profile.findById(profile_id);
            if (req.session.userId == myProfile.user) {
                let profile = await Profile.findByIdAndUpdate(profile_id, {
                    phone,
                    skills,
                    bio,
                    github_username
                }, {new: true}, (err, doc) => {
                    if (err) {
                        throw new Error("Something wrong when updating data!");
                    }
                });
                return profile;
            } else {
                throw new UserInputError(`This is not your profile to update`);
            }
        }
    }
}
