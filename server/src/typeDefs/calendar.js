import { gql } from 'apollo-server-express'


export default gql`
    extend type Query{
     calendar(id :String ):Calendar
     calendars : [Calendar]
    

    }

    extend type Mutation {
       
        updateCalendar(id:String,year :Int, month:Int, day:Int) :Calendar 
        deleteCalendar(id:String): Calendar
        eventAssignmentToCalendaer(id_event:ID!,id_user:ID!):Calendar


    }

    type Calendar {
        user:User
        year :Int,
        month:Int,
        day:Int,
        events:Event,
        workshops:WorkShop,
        meetings:Meeting,
       

        
      
     
    
    }`
