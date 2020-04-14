import * as types from "../constants/skills.constants";

const INIT_STATE = {
  skills: [],
};

export default (state = INIT_STATE.skills, action) => {
  switch (action.type) {
    case types.LOAD_SKILLS_SUCCESS:
      return action.skills;
    case types.ADD_NEW_SKILL_SUCCESS:
      return [...state, { ...action.skill }];
    case types.UPDATE_SKILL_SUCCESS:
      return state.map((item) =>
        item.id === action.skill.id ? action.skill : item
      );
    case types.DELETE_SKILL_SUCCESS:
      return state.filter((item) => item.id !== action.skill.id);
    default:
      return state;
  }
};
