import { gql } from "apollo-boost";
import client from "./client";

const GET_SKILLS = gql`
  query getSkills {
    getSkills {
      id
      label
      description
      type
    }
  }
`;

const CREATE_SKILL = gql`
  mutation createSkill($label: String, $description: String, $type: String) {
    createSkill(label: $label, description: $description, type: $type) {
      id
      label
      description
      type
    }
  }
`;

const UPDATE_SKILL = gql`
  mutation updateSkill(
    $id: ID!
    $label: String
    $description: String
    $type: String
  ) {
    updateSkill(
      id: $id
      label: $label
      description: $description
      type: $type
    ) {
      id
      label
      description
      type
    }
  }
`;

const DELETE_SKILL = gql`
  mutation deleteSkill($id: ID!) {
    deleteSkill(id: $id) {
      id
      label
      description
      type
    }
  }
`;

async function getSkills() {
  var data = await client.query({ query: GET_SKILLS });
  return data.data.getSkills;
}

async function addSkill(label, description, type) {
  const variables = { label, description, type };
  var data = await client.mutate({ mutation: CREATE_SKILL, variables });
  return data.data.createSkill;
}

async function updateSkill(id, label, description, type) {
  const variables = { id, label, description, type };
  var data = await client.mutate({ mutation: UPDATE_SKILL, variables });
  return data.data.updateSkill;
}

async function deleteSkill(id) {
  const variables = { id };
  var data = await client.mutate({ mutation: DELETE_SKILL, variables });
  return data.data.deleteSkill;
}

export { getSkills, addSkill, updateSkill, deleteSkill };
