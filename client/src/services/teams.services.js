import { gql } from "apollo-boost";
import client from "./client";

const GET_TEAMS = gql`
  query teams {
    getTeams {
      id
      name
      members {
        id
        name
      }
      tutors {
        id
        name
      }
      subject {
        id
        name
      }
    }
  }
`;

async function getTeams() {
  var data = await client.query({ query: GET_TEAMS });
  return data.data.getTeams;
}

const CHANGE_TEAM_NAME = gql`
  mutation changeName($id: ID!, $name: String!) {
    changeName(id: $id, name: $name) {
      id
      name
      members {
        id
        name
      }
      tutors {
        id
        name
      }
      subject {
        id
        name
      }
    }
  }
`;

async function changeName(id, name) {
  const variables = { id, name };
  var data = await client.mutate({ mutation: CHANGE_TEAM_NAME, variables }); 
  return data.data.changeName;
}


const CHANGE_SUBJECT = gql`
  mutation assignOrChangeSubject($id: ID!, $new_subject_id: ID!) {
    assignOrChangeSubject(id: $id, new_subject_id: $new_subject_id) {
      id
      name
      members {
        id
        name
      }
      tutors {
        id
        name
      }
      subject {
        id
        name
      }
    }
  }
`;

async function assignOrChangeSubject(id, subject_id) {
    const variables = { id, subject_id };
    var data = await client.mutate({ mutation: CHANGE_SUBJECT, variables }); 
    return data.data.assignOrChangeSubject;
  }

export { getTeams, changeName, assignOrChangeSubject };
