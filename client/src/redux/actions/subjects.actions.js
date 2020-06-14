import * as types from "../constants/subjects.constants";
import * as subjectApi from "../../services/subjects.services";

export function loadSubjectsSuccess(subjects) {
  return { type: types.LOAD_SUBJECTS_SUCCESS, subjects };
}

export function loadSubjects() {
  debugger;
  return function (dispatch) {
    return subjectApi
      .getSubjects()
      .then((subjects) => {
        dispatch(loadSubjectsSuccess(subjects));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function addsubjectSuccess(subject) {
  return { type: types.ADD_SUBJECTS_SUCCESS, subject };
}

export function addsubject(id, title, description) {
  return function (dispatch) {
    return subjectApi
      .add_subject(id, title,
        description)
      .then((subject) => {          
        dispatch({ type: types.ADD_SUBJECTS_SUCCESS, subject });
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function addtaskSuccess(subject) {
  return { type: types.ADD_TASK_SUCCESS, subject };
}

export function addtask(id,start_date,
  end_date,
  description,
  goal) {
  return function (dispatch) {
    return subjectApi
      .add_task(id,start_date,
        end_date,
        description,
        goal)
      .then((subject) => {          
        dispatch({ type: types.ADD_TASK_SUCCESS, subject });
      })
      .catch((error) => {
        throw error;
      });
  };
}


export function updateSubjectSuccess(subject) {
  return { type: types.UPDATE_SUBJECT_SUCCESS, subject };
}

export function update_Subject(id, title,description) {
  return function (dispatch) {
    return subjectApi
      .updateSubject(id, title,description)
      .then((subject) => {
        dispatch(updateSubjectSuccess(subject));
      })
      .catch((err) => {
        throw err;
      });
  };
}

export function deleteSubjectSuccess(subject) {
  return { type: types.DELETE_SUBJECT_SUCCESS, subject };
}

export function delete_Subject(id) {
  return function (dispatch) {
    return subjectApi
      .deleteSubject(id)
      .then((subject) => {
        dispatch(deleteSubjectSuccess(subject));
      })
      .catch((err) => {
        throw err;
      });
  };
}


