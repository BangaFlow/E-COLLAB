import * as types from "../constants/profile.constants";

const INIT_STATE = {
  profiles: [],
};

export default (state = INIT_STATE.profiles, action) => {
  switch (action.type) {
    case types.CREATE_PROFILE_SUCCESS:
        return [...state, { ...action.profile }];
    default:
      return state;
  }
};
