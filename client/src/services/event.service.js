import { gql } from 'apollo-boost'
import client from './client'

const GET_EVENT = gql`
  query{ allEvents {
    eventName
    eventType
    description
    date
    startTime
    endTime
        
    }}
`

async function getEvents() {
  debugger
  var data = await client.query({ query: GET_EVENT });
  
  console.log(data)
  return data.data.allEvents;
}

 

export { getEvents }
