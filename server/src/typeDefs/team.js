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
    getTeamsByUserId(id: ID!): [Team]
  }

  extend type Mutation {
    createTeam(name: String, members: [String]): Team
    changeName(id: ID!, name: String!): Team
    transferMembers(
      id_team_1: ID!
      id_member_team_1: ID!
      id_team_2: ID!
      id_member_team_2: ID!
    ): [Team]
    generateRandomTeams(project_id: ID!): [Team]
    assignOrChangeSubject(id: ID!, new_subject_id: ID!): Team
    assignTutor(id_team: ID!, id_tutor: ID!): Team
    changeTutors(id_team: ID!, id_old_tutor: ID!, id_new_tutor: ID!): Team
    moveLearner(id_member: ID!, id_team_from: ID!, id_team_to: ID!): [Team]
  }
`;
