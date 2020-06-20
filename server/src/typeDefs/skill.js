import { gql } from "apollo-server-express";

export default gql`
  type Skill {
    id: ID!
    label: String!
    description: String!
    type: String!
  }

  extend type Mutation {
    createSkill(label: String, description: String, type: String): Skill
    updateSkill(
      id: ID!
      label: String
      description: String
      type: String
    ): Skill
    deleteSkill(id: ID!): Skill
  }

  extend type Query {
    getSkills: [Skill]
    getSkillById(id: ID!): Skill
  }
`;
