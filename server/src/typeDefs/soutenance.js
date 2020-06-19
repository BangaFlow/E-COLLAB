import { gql } from 'apollo-server-express'

export default gql`
   
    extend type Query{
     soutenance(id :String ):Soutenance
     allSoutenances : [Soutenance]
    

    }

    extend type Mutation {
        addSoutenance(id:String,subject:String,date : String,date: String,startTime : String,endTime : String  ):Soutenance 
        updateSoutenance(id:String,subject:String,date : String,date: String,startTime : String,endTime : String ) :Soutenance 
        deleteSoutenance(id: String): Soutenance
    }

    type Soutenance {
        subject:String, 
        group:[User],
        date : String,
        startTime : String,
        endTime : String

        
    
    }`
