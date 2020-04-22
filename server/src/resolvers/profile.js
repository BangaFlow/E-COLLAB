import {UserInputError} from "apollo-server-errors";

const Profile = require("../models/profile");


export default {
    Query: {
        getMyProfile: (root, arg, {req}, info) => {
            return Profile.findOne({user: req.session.userId});
        },
        getProfile: (root, {id}, {req}, info) => {
            return Profile.findOne({user: id});
        }
    },
    Mutation: {
        createProfile: async (root, {image, title, location, phone, about, github_username, user_id}, {req}, info) => {
            let newProfile = new Profile();
            newProfile.user = user_id;
            newProfile.image = image;
            newProfile.title = title;
            newProfile.location = location;
            newProfile.phone = phone;
            newProfile.about = about;
            newProfile.github_username = github_username;
            console.log(newProfile);
            
            return await newProfile.save();
        },

        updateMyProfile: async (root, {image, title, location, phone, about, github_username, profile_id}, {req}, info) => {
            let myProfile = await Profile.findById(profile_id);
            if (req.session.userId == myProfile.user) {
                let profile = await Profile.findByIdAndUpdate(profile_id, {
                    image,
                    title,
                    location,
                    phone,
                    about,
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
    },
    Profile: {
        user: async (profile, arg, context, info) => {
            return (await profile.populate('user').execPopulate()).user
        },
        skills: async (profile, arg, context, info) => {
            return (await profile.populate('skill').execPopulate()).skills
        }
        
    }
}
