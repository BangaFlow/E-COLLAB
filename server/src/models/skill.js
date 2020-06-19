const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema({
    label : {
        type: String,
        validate: {
            validator: label => Skill.doesntExist({ label }),
            message: ({ value }) => `Role ${value} exist already.`
        }
        
    },
    description : {
        type : String
    },
    type :{
        type : String
    }
});

SkillSchema.statics.doesntExist = async function (params) {
    return await this.where(params).countDocuments() === 0
}

module.exports = Skill = mongoose.model('skill', SkillSchema);
