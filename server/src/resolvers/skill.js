import Skill from "../models/skill";

export default {
    Query: {
        getSkills: (_, __, context, info) => {
            return Skill.find();
        }
    },
    Mutation: {
        createSkill: async (_, {label, description, type}, {req}, info ) => {
            const skill = new Skill();
            skill.label=label;
            skill.description=description;
            skill.type=type;
            const newSkill = await skill.save();
            return newSkill;
        }
    }
};