import { gql } from 'apollo-server-express'

export default gql`
 
    extend type Query{
     question(id :String ):Question
     allQuestions : [Question]
    

    }

    extend type Mutation {
        addQuestion( id:String,question:String,optionA:String,optionB:String,optionC:String,optionD:String,note:Int,time:Int, answer:String):Question 
        updateQuestion(id:String,question:String,answer:String,optionA:String,optionB:String,optionC:String,optionD:String,note:Int) :Question 
        deleteQuestion(id: String): Question
    }

    type Question {
        id:ID,
        question:String,
        optionA:String,
        optionB:String,
        optionC:String,
        optionD:String,
        answer:String,
        note: Int
    }`
