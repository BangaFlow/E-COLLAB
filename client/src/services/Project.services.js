import { gql } from "apollo-boost";
import client from "./client";

const GET_PROJECTS = gql`
  query getprojects {
    getprojects {
    id
    title
    category
	  school_year
    start_date
    end_date
    class_involved
    number_of_teams
    number_of_members
    number_of_tutors_per_team
    subjects{id
     title}
    }
  }
`;
const UPDATE_PROJECT = gql`
  mutation updateproject(
    $id: String
    $title: String,
    $school_year:String,
    $class_involved:String,
    $number_of_teams:String,
    $number_of_members:String,
    $number_of_tutors_per_team:String
  ) {
    updateproject(
      id: $id
      title: $title,
    school_year:$school_year,
    class_involved:$class_involved,
    number_of_teams:$number_of_teams,
    number_of_members:$number_of_members,
    number_of_tutors_per_team:$number_of_tutors_per_team
    ) {
      id
      title
    category
	  school_year
    class_involved
    number_of_teams
    number_of_members
    number_of_tutors_per_team
    }
  }
`;

const DELETE_PROJECT = gql`
  mutation deleteproject($id: String) {
    deleteproject(id: $id) {
     id
    }
  }
`;
const CREATE_PROJECT = gql`
  mutation addproject($title: String,
    $school_year:String,
    $class_involved:String,
    $number_of_teams:Int,
    $number_of_members:Int,
    $number_of_tutors_per_team:Int,
    $auto_generate_teams: Boolean,
    $competence_generate_teams: Boolean,
    $learners_choose_teams: Boolean,
    $Choose_date_limit: periode_input)
     {
    addproject(title: $title,
    school_year:$school_year,
    class_involved:$class_involved,
    number_of_teams:$number_of_teams,
    number_of_members:$number_of_members,
    number_of_tutors_per_team:$number_of_tutors_per_team) {
      id
     title
    }
  }
`;

async function getProjects() {
  
  var data = await client.query({ query: GET_PROJECTS });
  return data.data.getprojects;
  //console.log(this.data);
}
async function addProject(title,school_year,class_involved,number_of_teams,number_of_members,number_of_tutors_per_team) {
  const variables = { title,school_year,class_involved,number_of_teams,number_of_members,number_of_tutors_per_team};
  var data = await client.mutate({ mutation: CREATE_PROJECT, variables });
  return data.data.addproject;
}

async function updateProject(id, title,school_year,class_involved,number_of_teams,number_of_members,number_of_tutors_per_team) {
  const variables = { id, title,school_year,class_involved,number_of_teams,number_of_members,number_of_tutors_per_team };
  var data = await client.mutate({ mutation: UPDATE_PROJECT, variables });
  return data.data.updateproject;
}

async function deleteProject(id) {
  const variables = { id };
  var data = await client.mutate({ mutation: DELETE_PROJECT, variables });
  return data.data.deleteproject;
}

export { getProjects,addProject,updateProject,deleteProject };