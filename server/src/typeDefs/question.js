import { gql } from 'apollo-server-express'

export default gql`
 
    extend type Query{
     question(id :String ):Question
     allQuestions : [Question]
    

    }

    extend type Mutation {
        addQuestion( question:String ,note:Int):Question 
        updateQuestion(id:String,question:String,note:Int) :Question 
        AssignmentAnswersToQuestion(id_question:String,id_answers:[String]):Question
        deleteQuestion(id: String): Question
    }

    type Question {
        id:ID,
        question:String,
        answers:[Answer],
        note: Int
    }`
