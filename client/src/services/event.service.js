import { gql } from 'apollo-boost'
import client from './client'

const GET_EVENT = gql`
  query{ allEvents {
    id
  eventName

  eventType
  eventOrganizer
  description
  place
   Date
        
    }}

`

const CREATE_EVENT = gql`
  mutation
  addEvent($eventName :String, $eventType:String, $description : String, $place:String, $eventOrganizer:String, $Date: Date){

  addEvent(eventName :$eventName, eventType:$eventType, description : $description, place:$place, eventOrganizer:$eventOrganizer, Date: $Date){

  id
  eventName
  eventType
  eventOrganizer
  description
  place
   Date
  }
  
}
`;






async function getEvents() {
  debugger
  var data = await client.query({ query: GET_EVENT });

  console.log(data)
  return data.data.allEvents;
};


async function addEvent(eventName,eventType, description, date,eventOrganizer,place) {
  debugger
  const variables = { eventName,eventType, description, date,eventOrganizer,place };
  console.log(variables)
  var data = await client.mutate({ mutation: CREATE_EVENT, variables });
  debugger
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

  updateEvent($id:String,$eventName :String, $eventType:String, $description : String, $place:String, $eventOrganizer:String, $Date: Date){

  updateEvent(id:$id,eventName :$eventName, eventType:$eventType, description : $description, place:$place, eventOrganizer:$eventOrganizer, Date: $Date){

  id
  eventName
  eventType
  eventOrganizer
  description
  place
   Date
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



async function updateEvent(id,eventName,eventType, description, date,eventOrganizer,place) {
  debugger
  const variables = {id,eventName,eventType, description, date,eventOrganizer,place };
  var data = await client.mutate({ mutation: UPDATE_EVENT, variables });
  console.log(data)
  debugger
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
