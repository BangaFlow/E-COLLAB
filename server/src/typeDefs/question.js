import { gql } from 'apollo-server-express'

export default gql`
 
    extend type Query{
     question(id :String ):Meeting
     allQuestions : [Meeting]
    

    }

    extend type Mutation {
        addQuestion( question:String ,note:Int):Question 
        updateQuestion(id:String,question:String) :Question 
        AssignmentAnswersToQuestion(id_quiz:String,id_question:[String]):Question
        deleteQuestion(id: String): Question
    }

    type Question {
        id:ID,
        question:String,
        answers:[Answer],
        note: Int
    }`
