import { gql } from 'apollo-server-express'

export default gql`
   scalar Date
   
    extend type Query{
     event(id :String ):Event
     allEvents : [Event]
    

    }

    extend type Mutation {
        addEvent( eventName :String,
        eventType:String,
        description : String,
        keyWords: [String],
        eventCreator:String,
        eventOrganizers:String
        startDate: Date,
        endDate : Date):Event 
        updateEvent(id:String,eventName :String,eventType:String, description : String, date: String,  startTime : String,endTime : String ) :Event 
        deleteEvent(id: String): Event
        participantsAssignment(participant:String,id:ID!): Event
       
    }
   
   
    type Event {
        id: ID!
        eventName :String,
        eventType:String,
        description : String,
        keyWords: [String],
        eventCreator:String,
        eventOrganizers:String
        startDate: Date,
        endDate : Date,   
        participants:[User]
    
         
    
     
    
    }`

   
