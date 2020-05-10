import { gql } from 'apollo-boost'
import client from './client'

const GET_EVENT = gql`
  query{ allEvents {
    id
  eventName
  eventCreator
  eventType
  eventOrganizers
  description
  keyWords
  startDate
  endDate
        
    }}

`

const CREATE_EVENT = gql`
  mutation
  addEvent($eventName: String,$eventType: String,$description: String,$date: String,$startTime: String,$endTime: String){

  addEvent(eventName: $eventName,eventType: $eventType,description: $description,date: $date,startTime: $startTime,endTime: $endTime){

  id
  eventName
  description

  }
  
}
`;






async function getEvents() {
  debugger
  var data = await client.query({ query: GET_EVENT });

  console.log(data)
  return data.data.allEvents;
};


async function addEvent(eventName, eventType, description, date, startTime, endTime) {
  const variables = { eventName, eventType, description, date, startTime, endTime };
  console.log(variables)
  var data = await client.mutate({ mutation: CREATE_EVENT, variables });
  return data.data.addEvent;
};

const GET_USER_CALENDAR = gql`
  mutation
  getUsercalendar($id :String ){
    getUsercalendar(id :$id ) {

  id
  events{id
  eventName
  startDate
  endDate}

  }}

`

const DELETE_EVENT = gql`
  mutation
  deleteEvent($id:String){
    deleteEvent(id :$id ) {

  id
  
  eventName


  }
  }

`

const UPDATE_EVENT = gql`
  mutation
  updateEvent($id:String,$eventName:String){
    updateEvent(id :$id ,eventName:$eventName) {

      id
  eventName
  eventCreator
  eventType
  eventOrganizers
  description
  keyWords
  startDate
  endDate
  }
  }

`


async function getUserCalendar(id) {
  debugger
  const variables = { id };
  var data = await client.mutate({ mutation: GET_USER_CALENDAR, variables });
  console.log(data)

  return data.data.getUsercalendar;
};



async function updateEvent(id, eventName) {
  debugger
  const variables = { id, eventName };
  var data = await client.mutate({ mutation: UPDATE_EVENT, variables });
  console.log(data)

  return data.data.updateEvent;
};




async function deleteEvent(id) {
  debugger
  const variables = { id };
  var data = await client.mutate({ mutation: DELETE_EVENT, variables });
  console.log(data)

  return data.data.deleteEvent;
};




export { getEvents, addEvent, getUserCalendar, deleteEvent, updateEvent }
