export default function quizReducer ( quiz = [] , action ){


    switch(action.type){

        case "LOAD_aLL_QUIZZES_SUCCESS" :

           debugger
           return action.quiz;

           case "ADD_QUIZ_QUESTION_SUCCESS" :

            debugger
            return [...quiz, { ...action.quiz}]

            case "ADD_QUIZ_SUCCESS" :

            debugger
            
            return [...quiz, { ...action.quiz}]

            case "DELETE_QUIZ_SUCCESS" :
                    
            return quiz.filter((item) => item.id !== action.quiz.id);

            case "DELETE_QUIZ_QUESTION_SUCCESS" :
            debugger
           
            
            return quiz.filter((item) => item.id !== action.quiz.id);

            case "LOAD_QUIZ_SUCCESS" :
                debugger
             return action.quiz
            case "UPDATE_QUIZ_QUESTION_SUCCESS":
                debugger
                 return quiz.map((item) =>
                item.id === action.quiz.id ? action.quiz : item
              );
    
        


    
    default : 
        return quiz ;     
    }  

}
