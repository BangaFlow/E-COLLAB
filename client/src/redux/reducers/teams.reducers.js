import * as types from "../constants/teams.constants";

const INIT_STATE = {
  teams: [],
  fetchedTeams: false,
  projects: [],
  selectedTeam: null,
};

export default (state = INIT_STATE, action) => {
  let tab = [];
  switch (action.type) {
    case types.FETCH_TEAMS:
      return Object.assign({}, state, {
        teams: action.teams,
        fetchedTeams: true,
      });
    case types.FETCH_PROJECTS:
      return Object.assign({}, state, {
        projects: action.projects,
      });
    case types.CHANGE_TEAM_NAME:
      tab = state.teams.map((item) =>
        item.id === action.team.id ? action.team : item
      );
      return { ...state, teams: tab };
    case types.CREATE_TEAM:
      return Object.assign({}, state, {
        teams: [...state.teams, action.team],
      });
    case types.AUTO_GENERATE_TEAMS:
      return Object.assign({}, state, {
        teams: [...state.teams, ...action.teams],
      });
    case types.SELECT_TEAM:
      return { ...state, selectedTeam: action.team };
    default:
      return state;
  }
};
