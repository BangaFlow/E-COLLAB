import * as types from "../constants/skills.constants";
import * as skillApi from "../../services/skills.services";

export function loadSkillsSuccess(skills) {
  return { type: types.LOAD_SKILLS_SUCCESS, skills };
}

export function loadSkills() {
  return function (dispatch) {
    return skillApi
      .getSkills()
      .then((skills) => {
        dispatch(loadSkillsSuccess(skills));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function addNewSkillSuccess(skill) {
  return { type: types.ADD_NEW_SKILL_SUCCESS, skill };
}

export function addSkill(label, description, type) {
  return function (dispatch) {
    return skillApi
      .addSkill(label, description, type)
      .then((skill) => {
        dispatch(addNewSkillSuccess(skill));
      })
      .catch((err) => {
        throw err;
      });
  };
}

export function updateSkillSuccess(skill) {
  return { type: types.UPDATE_SKILL_SUCCESS, skill };
}

export function updateSkill(id, label, description, type) {
  return function (dispatch) {
    return skillApi
      .updateSkill(id, label, description, type)
      .then((skill) => {
        dispatch(updateSkillSuccess(skill));
      })
      .catch((err) => {
        throw err;
      });
  };
}

export function deleteSkillSuccess(skill) {
  return { type: types.DELETE_SKILL_SUCCESS, skill };
}

export function deleteSkill(id) {
  return function (dispatch) {
    return skillApi
      .deleteSkill(id)
      .then((skill) => {
        dispatch(deleteSkillSuccess(skill));
      })
      .catch((err) => {
        throw err;
      });
  };
}
