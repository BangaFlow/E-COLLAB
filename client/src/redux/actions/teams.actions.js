import * as types from "../constants/teams.constants";
import * as teamsApi from "../../services/teams.services";

export function fetchTeams() {
  return function (dispatch) {
    return teamsApi
      .getTeams()
      .then((teams) => {
        dispatch({ type: types.FETCH_TEAMS, teams });
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function fetchProjects() {
  return function (dispatch) {
    return teamsApi
      .getProjects()
      .then((projects) => {
        dispatch({ type: types.FETCH_PROJECTS, projects });
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function changeName(id, name) {
  return function (dispatch) {
    return teamsApi
      .changeName(id, name)
      .then((team) => {
        dispatch({ type: types.CHANGE_TEAM_NAME, team });
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function createTeam(name, members, project_id) {
  return function (dispatch) {
    return teamsApi
      .createTeam(name, members, project_id)
      .then((team) => {
        dispatch({ type: types.CREATE_TEAM, team });
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function generateRandomTeams(project_id) {
  return function (dispatch) {
    return teamsApi
      .generateRandomTeams(project_id)
      .then((teams) => {
        dispatch({ type: types.AUTO_GENERATE_TEAMS, teams });
      })
      .catch((error) => {
        throw error;
      });
  };
}

export const setSelectedTeam = (team) => {
  return {
    type: types.SELECT_TEAM,
    team,
  };
};
