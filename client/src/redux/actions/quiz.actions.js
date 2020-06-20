import * as types from '../constants/quiz.constants'
import * as quizApi from "../../services/quiz.services"



export function loadQuizSuccess(quiz) {

    return { type: types.LOAD_aLL_QUIZZES_SUCCESS ,quiz }
}

export function updateQuizSuccess(quiz) {

  return { type: types.UPDATE_QUIZ_QUESTION_SUCCESS ,quiz }
}

export function loadQuizByIdSuccess(quiz) {
  

  return { type: types.LOAD_QUIZ_SUCCESS ,quiz }
}


export function deleteQuestionSuccess(quiz) {

  return { type: types.DELETE_QUIZ_QUESTION_SUCCESS ,quiz }
}


export function addQuestionSuccess(quiz) {

  return { type: types.ADD_QUIZ_QUESTION_SUCCESS,quiz }
}

export function addQuizSuccess(quiz) {
  return { type: types.ADD_QUIZ_SUCCESS,quiz }
}
 

export function deleteQuizSuccess(quiz) {
  return { type: types.DELETE_QUIZ_SUCCESS,quiz }
}




export function addquiz(label,time) {
  return function (dispatch) {
    return quizApi.
    addQuiz(label,time)
      .then((quiz) => {
       dispatch(addQuizSuccess(quiz));
      })
      .catch((err) => {
        throw err;
      });
  };
}




export function deletequiz(id) {
  return function (dispatch) {
    return quizApi.
      deleteQuiz(id)
      .then((quiz) => {
        dispatch(deleteQuizSuccess(quiz));
      })
      .catch((err) => {
        throw err;
      });
  };
}




export function deletequestion(id) {
  return function (dispatch) {
    
    return quizApi.
      deleteQuestion(id)
      .then((quiz) => {
        dispatch(deleteQuestionSuccess(quiz));
      })
      .catch((err) => {
        throw err;
      });
  };
}


export function addquestion(id,question,optionA,optionB,optionC,optionD,note,answer) {
  return function (dispatch) {
    return quizApi.
    addQuestion(id,question,optionA,optionB,optionC,optionD,note,answer)
      .then((quiz) => {
        dispatch(addQuestionSuccess(quiz));
      })
      .catch((err) => {
        throw err;
      });
  };
}



export function updatequestion(id,question,optionA,optionB,optionC,optionD,note,answer) {
  return function (dispatch) {
    return quizApi.
    updateQuestion(id,question,optionA,optionB,optionC,optionD,note,answer)
      .then((quiz) => {
        dispatch(updateQuizSuccess(quiz));
      })
      .catch((err) => {
        throw err;
      });
  };
}


export function getAllQuizzes() {
   return function (dispatch) {
      return quizApi
        .getALLQuizzes()
        .then(quiz => {
          dispatch(loadQuizSuccess(quiz));
        })
        .catch(error => {
          throw error();
        });
    }
}


export function getQuizById(id) {
  return function (dispatch) {
     return quizApi
       .getQuizById(id)
       .then(quiz => {
         dispatch(loadQuizByIdSuccess(quiz));
       })
       .catch(error => {
         throw error();
       });
   }
}
