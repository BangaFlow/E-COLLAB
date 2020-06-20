import * as types from "../constants/Projects.constants";
import * as projectApi from "../../services/Project.services";

export function loadProjectsSuccess(projects) {
  return { type: types.LOAD_PROJECTS_SUCCESS, projects };
}

export function loadProjects() {
  debugger;
  return function (dispatch) {
    return projectApi
      .getProjects()
      .then((projects) => {
        dispatch(loadProjectsSuccess(projects));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function addNewProjectSuccess(project) {
  return { type: types.ADD_NEW_PROJECT_SUCCESS, project };
}

export function addProject(title,school_year,class_involved,number_of_teams,number_of_members,number_of_tutors_per_team) {
  return function (dispatch) {
    return projectApi
    .addProject(title,school_year,class_involved,number_of_teams,number_of_members,number_of_tutors_per_team)
      .then((project) => {
        dispatch(addNewProjectSuccess(project));
      })
      .catch((err) => {
        throw err;
      });
  };
}


export function updateProjectSuccess(project) {
  return { type: types.UPDATE_PROJECT_SUCCESS, project };
}


export function updateProject(id, title,school_year,class_involved,number_of_teams,number_of_members,number_of_tutors_per_team) {
  return function (dispatch) {
    return projectApi
      .updateProject(id, title,school_year,class_involved,number_of_teams,number_of_members,number_of_tutors_per_team)
      .then((project) => {
        dispatch(updateProjectSuccess(project));
      })
      .catch((err) => {
        throw err;
      });
  };
}

export function deleteProjectSuccess(project) {
  return { type: types.DELETE_PROJECT_SUCCESS, project };
}

export function deleteProject(id) {
  return function (dispatch) {
    return projectApi
      .deleteProject(id)
      .then((project) => {
        dispatch(deleteProjectSuccess(project));
      })
      .catch((err) => {
        throw err;
      });
  };
}


/* mutation{
 updateproject(id:"5ee110ae8c06e72344413838",title:"Springboot",category:"",school_year:"2023"){id}
  
}*/