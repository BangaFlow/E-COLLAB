

export default function eventReducer ( event = [] , action ){
        
    switch(action.type){

        case "LOAD_EVENT_SUCCESS" :

        debugger
           return action.event

        case "ADD_EVENT_SUCCESS" :

            return [...event, { ...action.event }]

        case "UPDATE_USER_EVENT_SUCCESS" :
            debugger
            return event.map((item) =>
            item.id === action.event.id ? action.event : item
          );

        case "LOAD_USER_EVENT_SUCCESS":

            debugger
            return action.event

        case "DELETE_USER_EVENT_SUCCESS" :
            return event.filter((item) => item.id !== action.event.id);
    
    default : 
        return event ;     
    }  


} 