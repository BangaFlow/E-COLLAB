import { gql } from 'apollo-server-express'

export default gql`
   
    extend type Query{
     event(id :String ):Event
     allEvents : [Event]
    

    }

    extend type Mutation {
        addEvent(id:String,eventName :String,eventType:String, description : String, date: String,  startTime : String,endTime : String ):Event 
        updateEvent(id:String,eventName :String,eventType:String, description : String, date: String,  startTime : String,endTime : String ) :Event 
        deleteEvent(id: String): Event
        participantsAssignment(participant:String,id:ID!): Event
       
    }
   
   
    type Event {
        id: ID!
        eventName :String,
        eventType:String,
        description : String,
        date: String,
        startTime : String,
        endTime : String    
        participants:[User]
    
         
    
     
    
    }`

   
