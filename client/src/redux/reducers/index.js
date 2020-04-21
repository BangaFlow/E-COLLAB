import { combineReducers } from 'redux'
import { authentication }  from './user.reducers'
import  courses   from './coursesReducer'
import  event   from './event.reducers'
const rootReducer = combineReducers({
    authentication,
    courses,
    event
})

export default rootReducer