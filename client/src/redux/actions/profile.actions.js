import * as types from "../constants/profile.constants";
import * as profileApi from "../../services/profile.services";

export function createProfile(
  image,
  title,
  location,
  phone,
  about,
  github_username,
  user_id
) {
  return function (dispatch) {
    return profileApi
      .createProfile(
        image,
        title,
        location,
        phone,
        about,
        github_username,
        user_id
      )
      .then((profile) => {
        dispatch({ type: types.CREATE_PROFILE_SUCCESS, profile });
      })
      .catch((err) => {
        throw err;
      });
  };
}

export function fetchProfile(id) {
  return function (dispatch) {
    return profileApi
      .getProfile(id)
      .then((profile) => {
        dispatch({ type: types.FETCH_PROFILE_BY_USER_ID, profile });
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function updateProfile({
  image,
  title,
  location,
  phone,
  about,
  github_username,
  profile_id,
}) {
  return function (dispatch) {
    return profileApi
      .updateProfile(
        image,
        title,
        location,
        phone,
        about,
        github_username,
        profile_id
      )
      .then((profile) => {
        console.log(profile);
        
        dispatch({ type: types.UPDATE_PROFILE, profile });
      })
      .catch((err) => {
        throw err;
      });
  };
}
