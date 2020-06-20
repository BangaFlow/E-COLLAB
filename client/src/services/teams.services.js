import client from "./client";
import {
  GET_TEAMS,
  CHANGE_TEAM_NAME,
  CHANGE_SUBJECT,
  CREATE_TEAM,
  GET_PROJECTS,
  AUTO_GENERATE_TEAMS,
  ADD_TUTOR,
  CHANGE_TUTOR,
  TRANSFER_MEMBER,
  SWAP_MEMBERS,
  ADD_MEMBER,
  REMOVE_MEMBER,
  REMOVE_TUTOR,
} from "./teamsQuery";

async function getTeams() {
  var data = await client.query({ query: GET_TEAMS });
  return data.data.getTeams;
}

async function getProjects() {
  var data = await client.query({ query: GET_PROJECTS });
  return data.data.getProjects;
}

async function changeName(id, name) {
  const variables = { id, name };
  var data = await client.mutate({ mutation: CHANGE_TEAM_NAME, variables });
  return data.data.changeName;
}

async function assignOrChangeSubject(id, new_subject_id) {
  const variables = { id, new_subject_id };
  var data = await client.mutate({ mutation: CHANGE_SUBJECT, variables });
  return data.data.assignOrChangeSubject;
}

async function createTeam(name, members, project_id) {
  const variables = { name, members, project_id };
  var data = await client.mutate({ mutation: CREATE_TEAM, variables });
  return data.data.createTeam;
}

async function generateRandomTeams(project_id) {
  const variables = { project_id };
  var data = await client.mutate({ mutation: AUTO_GENERATE_TEAMS, variables });
  return data.data.generateRandomTeams;
}

async function addTutor(id_team, id_tutor) {
  const variables = { id_team, id_tutor };
  var data = await client.mutate({ mutation: ADD_TUTOR, variables });
  return data.data.assignTutor;
}

async function changeTutor(id_team, id_old_tutor, id_new_tutor) {
  const variables = { id_team, id_old_tutor, id_new_tutor };
  var data = await client.mutate({ mutation: CHANGE_TUTOR, variables });
  return data.data.changeTutors;
}

async function transferMember(id_member, id_team_from, id_team_to) {
  const variables = { id_member, id_team_from, id_team_to };
  var data = await client.mutate({ mutation: TRANSFER_MEMBER, variables });
  return data.data.moveLearner;
}

async function swapMembers(
  id_team_1,
  id_member_team_1,
  id_team_2,
  id_member_team_2
) {
  const variables = {
    id_team_1,
    id_member_team_1,
    id_team_2,
    id_member_team_2,
  };
  var data = await client.mutate({ mutation: SWAP_MEMBERS, variables });
  return data.data.transferMembers;
}

async function addMember(id_team, id_member) {
  const variables = { id_team, id_member };
  var data = await client.mutate({ mutation: ADD_MEMBER, variables });
  return data.data.addNewMember;
}

async function removeMember(id_team, id_member) {
  const variables = { id_team, id_member };
  var data = await client.mutate({ mutation: REMOVE_MEMBER, variables });
  return data.data.removeMember;
}

async function removeTutor(id_team, id_tutor) {
  const variables = { id_team, id_tutor };
  var data = await client.mutate({ mutation: REMOVE_TUTOR, variables });
  return data.data.removeTutor;
}

export {
  getTeams,
  changeName,
  assignOrChangeSubject,
  createTeam,
  getProjects,
  generateRandomTeams,
  addTutor,
  changeTutor,
  transferMember,
  swapMembers,
  addMember,
  removeMember,
  removeTutor
};
