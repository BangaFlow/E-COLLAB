export default function workShopReducer ( meeting = [] , action ){
        
    switch(action.type){

        case "LOAD_MEETING_SUCCESS" :

           return action.meeting


    
    default : 
        return meeting ;     
    }  


} 