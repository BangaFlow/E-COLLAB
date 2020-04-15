import * as types from "../constants/teams.constants";

const INIT_STATE = {
  teams: [],
};

export default (state = INIT_STATE.teams, action) => {
  switch (action.type) {
    case types.FETCH_TEAMS:
      return action.teams;
    case types.CHANGE_TEAM_NAME:
      return state.map((item) =>
        item.id === action.team.id ? action.team : item
      );
    // case types.ADD_NEW_SKILL_SUCCESS:
    //   return [...state, { ...action.skill }];
    // case types.UPDATE_SKILL_SUCCESS:
    //   return state.map((item) =>
    //     item.id === action.skill.id ? action.skill : item
    //   );
    // case types.DELETE_SKILL_SUCCESS:
    //   return state.filter((item) => item.id !== action.skill.id);
    default:
      return state;
  }
};
