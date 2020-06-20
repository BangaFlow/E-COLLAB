import { gql } from "apollo-boost";
import client from "./client";

const GET_SUBJECTS = gql`
  query subjects {
    subjects {
      id
    title
    description
    Planning{
      id
      start_date
    end_date
    description
    goal
      }
    }
  }
`;

const ADD_SUBJECT = gql`
  mutation add_subjects_to_project($id: String, $title:String, $description:String) {
    add_subjects_to_project(id: $id, title: $title,description:$description) {
      id
      
    }
  }
`;


const UPDATE_SUBJECT = gql`
  mutation updatesubject(
    $id: String
    $title: String,
    $description:String
    
  ) {
    updatesubject(
      id: $id
      title: $title,
      description:$description
      
  
    ) {
      id
      title
      description
     }
  }
`;

const DELETE_SUBJECT= gql`
  mutation deletesubject($id: String) {
    deletesubject(id: $id) {
     id
    }
  }
`;

const ADD_TASK = gql`
  mutation add_task_to_subject($id:String,$start_date: String
        $end_date: String
        $description: String
        $goal: String) {
    add_task_to_subject(id: $id, start_date: $start_date,end_date: $end_date,description:$description,goal: $goal) {
      id
      
    }
  }
`;

async function getSubjects() {
  
  var data = await client.query({ query: GET_SUBJECTS });
  return data.data.subjects;
  //console.log(this.data);
}

async function add_subject(id, title,description) {
    const variables = { id, title,description };
    var data = await client.mutate({ mutation: ADD_SUBJECT, variables }); 
    return data.data.add_subjects_to_project;
  }

async function add_task(id,start_date,
  end_date,
  description,
  goal) {
    const variables = { id,start_date,
      end_date,
      description,
      goal };
    var data = await client.mutate({ mutation: ADD_TASK, variables }); 
    return data.data.add_task_to_subject;
  }

  async function updateSubject(id, title, description) {
    const variables = { id, title, description };
    var data = await client.mutate({ mutation: UPDATE_SUBJECT, variables });
    return data.data.updatesubject;
  }
  
  async function deleteSubject(id) {
    const variables = { id };
    var data = await client.mutate({ mutation: DELETE_SUBJECT, variables });
    return data.data.deletesubject;
  }
  



export { getSubjects,add_subject,add_task,updateSubject,deleteSubject };