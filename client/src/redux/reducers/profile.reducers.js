import * as types from "../constants/profile.constants";

export default (currentState = [], action) => {
  switch (action.type) {
    case types.FETCH_PROFILE_BY_USER_ID:
      return action.profile;
    case types.CREATE_PROFILE_SUCCESS:
      return action.profile;
    case types.UPDATE_PROFILE:
      return action.profile;
    default:
      return currentState;
  }
};
