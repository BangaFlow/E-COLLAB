import * as types from "../constants/categories.constants";
import * as typeprojectApi from "../../services/categories.services";

export function loadtypeProjectsSuccess(categories) {
  return { type: types.LOAD_TYPE_PROJECTS_SUCCESS, categories };
}


export function loadtypeProjects() {
  return function (dispatch) {
    return typeprojectApi
      .get_type_Projects()
      .then((categories) => {
        dispatch(loadtypeProjectsSuccess(categories));
      })
      .catch((error) => {
        throw error;
      });
  };
}



export function addprojecttocategorySuccess(category) {
  return { type: types.ADD_PROJECT_TO_CATEGORY_SUCCESS, category };
}


export function addproject(id, title,school_year,class_involved,
  number_of_teams,number_of_members,number_of_tutors_per_team,
  auto_generate_teams,competence_generate_teams,
  learners_choose_teams,
    start_choose_date,
    end_choose_date) {
  return function (dispatch) {
    return typeprojectApi
      .add_project_to_category(id, title,school_year,class_involved,number_of_teams,number_of_members,number_of_tutors_per_team,auto_generate_teams,competence_generate_teams,
        learners_choose_teams,
          start_choose_date,
          end_choose_date)
      .then((category) => {          
        dispatch({ type: types.ADD_PROJECT_TO_CATEGORY_SUCCESS, category });
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function addNewCategorySuccess(category) {
  return { type: types.ADD_TYPE_PROJECTS_SUCCESS, category };
}

export function addCategory(title, description,methodology) {
  return function (dispatch) {
    return typeprojectApi
    .add_Category(title, description,methodology)
      .then((category) => {
        dispatch(addNewCategorySuccess(category));
      })
      .catch((err) => {
        throw err;
      });
  };
}



export function updateCategorySuccess(category) {
  return { type: types.UPDATE_CATEGORY_SUCCESS, category };
}

export function update_Category(id, title,description,methodology) {
  return function (dispatch) {
    return typeprojectApi
      .updateCategory(id, title,description,methodology)
      .then((category) => {
        dispatch(updateCategorySuccess(category));
      })
      .catch((err) => {
        throw err;
      });
  };
}

export function deleteCategorySuccess(category) {
  return { type: types.DELETE_CATEGORY_SUCCESS, category };
}

export function delete_Category(id) {
  return function (dispatch) {
    return typeprojectApi
      .deleteCategory(id)
      .then((category) => {
        dispatch(deleteCategorySuccess(category));
      })
      .catch((err) => {
        throw err;
      });
  };
}

