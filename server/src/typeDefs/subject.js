import { gql } from 'apollo-server-express'

export default gql`

    type Subject {
        id: ID!
        title:String, 
        description:String,
        Planning:[Step]
        
        
    }
    extend type Query{
     subject(id:String):Subject
     subjects:[Subject]
    
    }
    extend type Mutation {
        addsubject(title:String, description:String ):Subject 
        updatesubject(id:String,title:String, description:String ):Subject
        deletesubject(id: String):Subject
        validatesubject(id: String):Subject
        addsubjecttoproject(title:String, description:String ):Subject
        add_phase(id_phase:String):Subject
        add_task_to_subject(id:String,start_date: String
        end_date: String
        description: String
        goal: String):Subject
    }
    
    
    `;