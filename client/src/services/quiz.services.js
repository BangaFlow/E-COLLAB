import { gql } from "apollo-boost";
import client from "./client";

const GET_QUIZZES = gql`
  query {
    allQuizzes {
      id
      label
      skill {
        id
      }
      questions {
        id
        question
        optionA
        optionB
        optionC
        optionD
        answer
        note
      }
      time
    }
  }
`;

const ASSIGN_SKILL = gql`
  mutation assignmetSkillToUser(
    $id_user: String
    $id_skill: String
    $grade: Int
  ) {
    assignmetSkillToUser(
      id_user: $id_user
      id_skill: $id_skill
      grade: $grade
    ) {
      id
    }
  }
`;

const UPDATE_QUESTION = gql`
  mutation updateQuestion(
    $id: String
    $question: String
    $optionA: String
    $optionB: String
    $optionC: String
    $optionD: String
    $note: Int
    $answer: String
  ) {
    updateQuestion(
      id: $id
      question: $question
      optionA: $optionA
      optionB: $optionB
      optionC: $optionC
      optionD: $optionD
      note: $note
      answer: $answer
    ) {
      id
      question
      optionA
      optionB
      optionC
      optionD
      answer
      note
    }
  }
`;

const GET_QUIZ_BY_ID = gql`
  query quiz($id: String) {
    quiz(id: $id) {
      id
      label
      questions {
        id
        question
        optionA
        optionB
        optionC
        optionD
        answer
        note
      }
      time
    }
  }
`;

const ADD_QUESTION = gql`
  mutation addQuestion(
    $id: String
    $question: String
    $optionA: String
    $optionB: String
    $optionC: String
    $optionD: String
    $note: Int
    $answer: String
  ) {
    addQuestion(
      id: $id
      question: $question
      optionA: $optionA
      optionB: $optionB
      optionC: $optionC
      optionD: $optionD
      note: $note
      answer: $answer
    ) {
      id
      question
      optionA
      optionB
      optionC
      optionD
      answer
      note
    }
  }
`;

const ADD_QUIZ = gql`
  mutation addQuiz($label: String, $time: Int, $id_skill: String) {
    addQuiz(label: $label, time: $time, id_skill: $id_skill) {
      id
      label
      time
    }
  }
`;

const DELETE_QUIZ = gql`
  mutation deleteQuiz($id: String) {
    deleteQuiz(id: $id) {
      id
    }
  }
`;

const DELETE_QUESTION = gql`
  mutation deleteQuestion($id: String) {
    deleteQuestion(id: $id) {
      id
    }
  }
`;

async function deleteQuestion(id) {
  const variables = { id };
  console.log(variables);
  var data = await client.mutate({ mutation: DELETE_QUESTION, variables });
  return data.data.deleteQuestion;
}

async function deleteQuiz(id) {
  const variables = { id };
  console.log(variables);
  var data = await client.mutate({ mutation: DELETE_QUIZ, variables });
  return data.data.deleteQuiz;
}

async function addQuiz(label, time, id_skill) {
  const variables = { label, time, id_skill };
  console.log(variables);
  var data = await client.mutate({ mutation: ADD_QUIZ, variables });
  const result = data.data.addQuiz;

  return result;
}

async function addQuestion(
  id,
  question,
  optionA,
  optionB,
  optionC,
  optionD,
  note,
  answer
) {
  const variables = {
    id,
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    note,
    answer,
  };
  console.log(variables);
  var data = await client.mutate({ mutation: ADD_QUESTION, variables });
  return data.data.addQuestion;
}

async function updateQuestion(
  id,
  question,
  optionA,
  optionB,
  optionC,
  optionD,
  note,
  answer
) {
  const variables = {
    id,
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    note,
    answer,
  };
  console.log(variables);
  var data = await client.mutate({ mutation: UPDATE_QUESTION, variables });

  return data.data.updateQuestion;
}

async function getALLQuizzes() {
  var data = await client.query({ query: GET_QUIZZES });

  return data.data.allQuizzes;
}

async function getQuizById(id) {
  const variables = { id };
  var data = await client.query({ query: GET_QUIZ_BY_ID, variables });
  console.log("data " + data);

  return data.data.quiz;
}

async function assignSkill(id_user, id_skill, grade) {
  const variables = { id_user, id_skill, grade };
  console.log(variables);
  var data = await client.mutate({ mutation: ASSIGN_SKILL, variables });
  return data.data.assignmetSkillToUser;
}

export {
  getALLQuizzes,
  addQuestion,
  addQuiz,
  deleteQuiz,
  deleteQuestion,
  updateQuestion,
  getQuizById,
  assignSkill,
};
