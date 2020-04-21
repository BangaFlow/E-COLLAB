

export default function eventReducer ( event = [] , action ){
        
    switch(action.type){

        case "LOAD_EVENT_SUCCESS" :
        debugger
           return action.event
       
    default : 
        return event ;     
    }  


} 