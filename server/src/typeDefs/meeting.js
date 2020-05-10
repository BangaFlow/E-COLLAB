import { gql } from 'apollo-server-express'

export default gql`
 
    extend type Query{
     meeting(id :String ):Meeting
     allMeetings : [Meeting]
    

    }

    extend type Mutation {
        addMeeting(subject :String, startTime : Date, endTime : Date  ):Meeting 
        updateMeeting(id:String,subject :String,startTime : Date,endTime : Date ) :Meeting 
        AssignmentGroupToMetting(id_meeting:String,emails:[String]):Meeting
        deleteMeeting(id: String): Meeting
    }

    type Meeting {
        id:ID
        subject :String,
        group:[User],
        startTime : Date,
        endTime : Date
    }`
