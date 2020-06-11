import client from "./client";
import {
  GET_TEAMS,
  CHANGE_TEAM_NAME,
  CHANGE_SUBJECT,
  CREATE_TEAM,
  GET_PROJECTS,
  AUTO_GENERATE_TEAMS,
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

async function assignOrChangeSubject(id, subject_id) {
  const variables = { id, subject_id };
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

export {
  getTeams,
  changeName,
  assignOrChangeSubject,
  createTeam,
  getProjects,
  generateRandomTeams,
};
