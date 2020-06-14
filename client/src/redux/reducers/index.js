import { combineReducers } from 'redux'
import { authentication }  from './user.reducers'
//import  project  from './Projects.reducers'

const rootReducer = combineReducers({
    authentication,
    
    //project
})

export default rootReducer