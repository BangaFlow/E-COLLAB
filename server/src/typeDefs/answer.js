import { gql } from 'apollo-server-express'

export default gql`
 
    extend type Query{
     answer(id :String ):Answer
     allAnswers : [Answer]
    

    }

    extend type Mutation {
        addAnswer( answer:String ,correction:Boolean):Answer 
        updateAnswer(id:String,answer:String,correction:Boolean) :Answer 
        deleteAnswer(id: String): Answer
    }

    type Answer {
        id:ID,
        answer:String,
        correction:Boolean,
      
    }`
