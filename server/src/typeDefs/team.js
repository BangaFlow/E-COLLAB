import { gql } from "apollo-server-express";

export default gql`
  scalar Date

  type Period {
    start_choose_date: Date
    end_choose_date: Date
  }

  type Project {
    id: ID!
    number_of_teams: Int
    number_of_members: Int
    tutors_involved: [User]
    number_of_tutors_per_team: Int
    learners_involved: [User]
    subjects: [Subject]
    auto_generate_teams: Boolean
    competence_generate_teams: Boolean
    learners_choose_teams: Boolean
    choose_date_limit: Period
  }

  type Team {
    id: ID!
    name: String!
    members: [User]
    tutors: [User]
    subject: Subject
    project: Project
  }

  extend type Query {
    getTeams: [Team]
    getTeamById(id: ID!): Team
    getTeamsByUserId(id: ID!): [Team]
  }

  extend type Mutation {
    createTeam(name: String, members: [String], project_id: ID!): Team
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
