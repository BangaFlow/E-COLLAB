import { gql } from 'apollo-server-express'


export default gql`
    extend type Query{
     
     calendars : [Calendar]
     
    

    }

    extend type Mutation {
        
        updateCalendar(id:String,year :Int, month:Int, day:Int) :Calendar 
        deleteCalendar(id:String): Calendar
        eventAssignmentToCalendaer(id_event:ID!,id_user:ID!):Calendar
        eventAssignmentToCalendaerApi(id_event:ID!,id_user:ID!):Event

        getUsercalendar(id :String ):Calendar

    }
   

    type Calendar {
        id:ID
        user:User
        events:[Event],
        workshops:WorkShop,
        meetings:Meeting,
       

        
      
     
    
    }`
