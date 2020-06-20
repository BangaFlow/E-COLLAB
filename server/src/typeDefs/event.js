import { gql } from 'apollo-server-express'

export default gql`
    extend type Query{
     event(id :String ):Event
     allEvents : [Event]
    

    }

    extend type Mutation {
        addEvent(
        eventName :String,
        eventType:String,
        description : String,
        place:String,
        eventOrganizer:String,
        Date: Date):Event 

        updateEvent(id:String,
        eventName :String,
        eventType:String,
        description : String,
        place:String,
        eventOrganizer:String,
        Date: Date ) :Event 

        deleteEvent(id: String): Event

        participantsAssignment(participant:String,id:ID!): Event
       
    }
   
   
    type Event {
        id: ID!
        eventName :String,
        eventType:String,
        description : String,
        place:String,
        eventOrganizer:String
        Date: Date,   
        participants:[User]
    
         
    
     
    
    }`

   
