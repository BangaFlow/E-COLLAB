import { gql } from "apollo-boost";
import client from "./client";

const GET_TYPE_PROJECTS = gql`
  query gettypes_project {
    gettypes_project {
    id
    title
    description
    methodology
    Projects{id
    title}
    }
  }
`;

const UPDATE_CATEGORY = gql`
  mutation update_type_project(
    $id: String
    $title: String,
    $description:String,
    $methodology:String,
    
  ) {
    update_type_project(
      id: $id
      title: $title,
      description:$description,
      methodology:$methodology,
  
    ) {
      id
      title
      description
      methodology
    }
  }
`;

const DELETE_CATEGORY= gql`
  mutation delete_type_project($id: String) {
    delete_type_project(id: $id) {
     id
    }
  }
`;

const ADD_PROJECT = gql`
  mutation add_project($id: String,$title: String,
    $school_year:String,
    $class_involved:String,
    $number_of_teams:Int,
    $number_of_members:Int,
    $number_of_tutors_per_team:Int,
    $auto_generate_teams: Boolean,
    $competence_generate_teams: Boolean,
    $learners_choose_teams: Boolean,
  ) {
    add_project(
    id: $id, title:$title,
    school_year:$school_year,
    class_involved:$class_involved,
    number_of_teams:$number_of_teams,
    number_of_members:$number_of_members,
    number_of_tutors_per_team:$number_of_tutors_per_team,
    auto_generate_teams: $auto_generate_teams,
    competence_generate_teams: $competence_generate_teams,
    learners_choose_teams: $learners_choose_teams,
   ) {
      id
      
    }
  }
`;
const CREATE_CATEGORY = gql`
  mutation add_type_project($title:String, $description: String,$methodology:String) {
    add_type_project(title:$title, description: $description,methodology:$methodology) {
      id
     title
    }
  }
`;

async function add_Category(title, description,methodology) {
  const variables = { title, description,methodology};
  var data = await client.mutate({ mutation: CREATE_CATEGORY, variables });
  return data.data.add_type_project;
}
async function add_project_to_category(id, title,school_year,class_involved,number_of_teams,number_of_members,number_of_tutors_per_team,auto_generate_teams,
  competence_generate_teams,
  learners_choose_teams,
   
    ) {
    const variables = { id, title,school_year,class_involved,number_of_teams,number_of_members,number_of_tutors_per_team,auto_generate_teams,competence_generate_teams,
      learners_choose_teams,
 };
    var data = await client.mutate({ mutation: ADD_PROJECT, variables }); 
    return data.data.add_project;
}

async function get_type_Projects() {
  var data = await client.query({ query: GET_TYPE_PROJECTS });
  return data.data.gettypes_project;
}

async function updateCategory(id, title, description,methodology) {
  const variables = { id, title, description,methodology };
  var data = await client.mutate({ mutation: UPDATE_CATEGORY, variables });
  return data.data.update_type_project;
}

async function deleteCategory(id) {
  const variables = { id };
  var data = await client.mutate({ mutation: DELETE_CATEGORY, variables });
  return data.data.delete_type_project;
}


export { get_type_Projects,add_project_to_category,add_Category,updateCategory,deleteCategory };