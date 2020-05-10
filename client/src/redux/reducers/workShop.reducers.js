export default function workShopReducer ( workShop = [] , action ){
        
    switch(action.type){

        case "LOAD_WORKSHOP_SUCCESS" :

        debugger
           return action.workShop


    
    default : 
        return workShop ;     
    }  


} 