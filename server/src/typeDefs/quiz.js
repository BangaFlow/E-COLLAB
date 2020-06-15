import { gql } from 'apollo-server-express'

export default gql`
 
    extend type Query{
     quiz(id :String ):Quiz
     allQuizzes : [Quiz]
    

    }

    extend type Mutation {
        addQuiz(label:String,time:Int):Quiz 
        updateQuiz(id:String,label:String) :Quiz 
        AssignmentQuestionsToQuiz(id_quiz:String,id_questions:[String]):Quiz
        deleteQuiz(id: String): Quiz
    }

    type Quiz {
        id:ID,
        label:String,
        skill:Skill,
        time:Int,
        questions:[Question],
    }`
