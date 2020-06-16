import * as types from "../constants/profile.constants";

export default (currentState = [], action) => {
  switch (action.type) {
    case types.FETCH_PROFILE_BY_USER_ID:
      return action.profile;
    case types.CREATE_PROFILE_SUCCESS:
      return action.profile;
    case types.UPDATE_PROFILE:
      console.log(action.profile);
      
      return action.profile;
    default:
      return currentState;
  }
};
