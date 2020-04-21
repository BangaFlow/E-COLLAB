import { gql } from 'apollo-server-express'

export default gql`
   
    extend type Query{
     meeting(id :String ):Meeting
     allMeetings : [Meeting]
    

    }

    extend type Mutation {
        addMeeting(subject :String,date : String,date: String,startTime : String,endTime : String  ):Meeting 
        updateMeeting(id:String,subject :String,date : String,date: String,startTime : String,endTime : String ) :Meeting 
        deleteMeeting(id: String): Meeting
    }

    type Meeting {
        subject :String,
        group:[User],
        date : String,
        startTime : String,
        endTime : String

        
       


      
     
    
    }`
