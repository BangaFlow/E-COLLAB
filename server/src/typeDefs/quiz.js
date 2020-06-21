import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    quiz(id: String): Quiz
    allQuizzes: [Quiz]
  }

  extend type Mutation {
    addQuiz(label: String, id_skill: String, time: Int): Quiz
    updateQuiz(id: String, label: String): Quiz
    AssignmentQuestionsToQuiz(id_quiz: String, id_questions: [String]): Quiz
    deleteQuiz(id: String): Quiz
    assignmetSkillToUser(id_user: String, id_skill: String, grade: Int): Profile
  }

  type Quiz {
    id: ID
    label: String
    skill: Skill
    time: Int
    questions: [Question]
  }
`;
