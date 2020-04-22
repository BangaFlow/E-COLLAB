import * as types from "../constants/profile.constants";
import * as profileApi from "../../services/profile.services";
import { history } from "../../helpers/history";

export function createProfileSuccess(profile) {
  return { type: types.CREATE_PROFILE_SUCCESS, profile };
}

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
        dispatch(createProfileSuccess(profile));
        history.push("/app/profile");
      })
      .catch((err) => {
        throw err;
      });
  };
}
