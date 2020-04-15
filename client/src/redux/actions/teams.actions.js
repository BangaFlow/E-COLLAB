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
