const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema({
    label : {
        type: String
    },
    description : {
        type : String
    },
    type :{
        type : String
    },
   
});

module.exports = Skill = mongoose.model('skill', SkillSchema);
