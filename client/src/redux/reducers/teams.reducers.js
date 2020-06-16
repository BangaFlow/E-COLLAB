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
    case types.CHANGE_SUBJECT:
      tab = state.teams.map((item) =>
        item.id === action.team.id ? action.team : item
      );
      return { ...state, teams: tab };
    case types.ADD_TUTOR:
      tab = state.teams.map((item) =>
        item.id === action.team.id ? action.team : item
      );
      return { ...state, teams: tab };
    case types.TRANSFER_MEMBERS:
      tab = state.teams.map((item) =>
        item.id === action.teams[0].id
          ? action.teams[0]
          : item.id === action.teams[1].id
          ? action.teams[1]
          : item
      );
      return { ...state, teams: tab };
    case types.SWAP_MEMBERS:
      tab = state.teams.map((item) =>
        item.id === action.teams[0].id
          ? action.teams[0]
          : item.id === action.teams[1].id
          ? action.teams[1]
          : item
      );
      return { ...state, teams: tab };
    case types.ADD_MEMBER:
      tab = state.teams.map((item) =>
        item.id === action.team.id ? action.team : item
      );
      return { ...state, teams: tab };
    case types.REMOVE_MEMBER:
      tab = state.teams.map((item) =>
        item.id === action.team.id ? action.team : item
      );
      return { ...state, teams: tab, selectedTeam: action.team };
    case types.REMOVE_TUTOR:
      tab = state.teams.map((item) =>
        item.id === action.team.id ? action.team : item
      );
      return { ...state, teams: tab, selectedTeam: action.team };
    default:
      return state;
  }
};
