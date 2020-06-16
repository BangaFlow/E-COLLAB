export default function workShopReducer ( workShop = [] , action ){
        
    switch(action.type){

        case "LOAD_WORKSHOP_SUCCESS" :

        debugger
           return action.workShop

        case "ADD_WORKSHOP_SUCCESS" :
            return  [...workShop, { ...action.workshop }]
    
    default : 
        return workShop ;     
    }  


} 