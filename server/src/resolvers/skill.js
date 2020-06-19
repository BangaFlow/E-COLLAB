import Skill from "../models/skill";

export default {
  Query: {
    getSkills: (_, __, context, info) => {
      return Skill.find();
    },
    getSkillById: (_, { id }, context, info) => {
      return Skill.findById(id);
    }
  },
  Mutation: {
    createSkill: async (_, { label, description, type }, { req }, info) => {
      const skill = new Skill();
      skill.label = label;
      skill.description = description;
      skill.type = type;
      const newSkill = await skill.save();
      return newSkill;
    },
    updateSkill: async (_, { id, label, description, type }, { req }, info) => {
      return await Skill.findByIdAndUpdate(
        id,
        {
          label,
          description,
          type
        },
        { new: true },
        (err, doc) => {
          if (err) {
            throw new Error("Something wrong when updating data!");
          }
        }
      );
    },
    deleteSkill: async(_, {id}, context, info) => {
        return await Skill.findByIdAndDelete(id);
    }
  }
};
