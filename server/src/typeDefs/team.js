import { gql } from "apollo-server-express";

export default gql`
  type Team {
    id: ID!
    name: String!
    members: [User]
    tutors: [User]
    subject: Subject
  }

  extend type Query {
    getTeams: [Team]
    getTeamById(id: ID!): Team
  }

  extend type Mutation {
    createTeam(
      name: String
      members: [String]
      tutors: [String]
      subject: String
    ): Team
    changeName(id: ID!, name: String!): Team
    transferMembers(
      id_team_1: ID!
      id_member_team_1: ID!
      id_team_2: ID!
      id_member_team_2: ID!
    ): [Team]
    generateRandomTeams(project_id: ID!): [Team]
    assignOrChangeSubject(id: ID!, new_subject_id: ID!): Team
  }
`;
