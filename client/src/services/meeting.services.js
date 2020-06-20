import { gql } from 'apollo-boost'
import client from './client'

const GET_MEETINGS = gql`
  query{allMeetings {id,
  subject,
  startTime
}}
`

async function getMeetings() {
    
    var data = await client.query({ query:  GET_MEETINGS });
  
    console.log(data)
    return data.data.allMeetings;
  };
  

export { getMeetings }
