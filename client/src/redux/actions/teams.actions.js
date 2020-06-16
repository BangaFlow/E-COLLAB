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

export function changeSubject(id, new_subject_id) {
  return function (dispatch) {
    return teamsApi
      .assignOrChangeSubject(id, new_subject_id)
      .then((team) => {
        dispatch({ type: types.CHANGE_SUBJECT, team });
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function addNewTutor(id_team, id_tutor) {
  return function (dispatch) {
    return teamsApi
      .addTutor(id_team, id_tutor)
      .then((team) => {
        dispatch({ type: types.ADD_TUTOR, team });
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function changeTutor(id_team, id_old_tutor, id_new_tutor) {
  return function (dispatch) {
    return teamsApi
      .changeTutor(id_team, id_old_tutor, id_new_tutor)
      .then((team) => {
        dispatch({ type: types.SWAP_TUTOR, team });
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function transfermember(id_member, id_team_from, id_team_to) {
  return function (dispatch) {
    return teamsApi
      .transferMember(id_member, id_team_from, id_team_to)
      .then((teams) => {
        dispatch({ type: types.TRANSFER_MEMBERS, teams });
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function swapMembers(
  id_team_1,
  id_member_team_1,
  id_team_2,
  id_member_team_2
) {
  return function (dispatch) {
    return teamsApi
      .swapMembers(id_team_1, id_member_team_1, id_team_2, id_member_team_2)
      .then((teams) => {
        dispatch({ type: types.SWAP_MEMBERS, teams });
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function addNewMember(id_team, id_member) {
  return function (dispatch) {
    return teamsApi
      .addMember(id_team, id_member)
      .then((team) => {
        dispatch({ type: types.ADD_MEMBER, team });
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function removeMember(id_team, id_member) {
  return function (dispatch) {
    return teamsApi
      .removeMember(id_team, id_member)
      .then((team) => {
        dispatch({ type: types.REMOVE_MEMBER, team });
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function removeTutor(id_team, id_tutor) {
  return function (dispatch) {
    return teamsApi
      .removeMember(id_team, id_tutor)
      .then((team) => {
        dispatch({ type: types.REMOVE_TUTOR, team });
      })
      .catch((error) => {
        throw error;
      });
  };
}
