const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    image: {
        type: String
    },
    title : {
        type: String
    },
    location: {
        type: String
    },
    phone: {
        type: String,
        validate : {
            validator : function (v) {
                return /\d{5} \d{8}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number! it must be on the format 00216 22555444 `
        }
    },
    about: {
        type: String
    },
    skills: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'skill'
        }]
    },
    github_username: {
        type: String
    },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);

