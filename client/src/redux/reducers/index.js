import { combineReducers } from 'redux'
import { authentication }  from './user.reducers'

const rootReducer = combineReducers({
    authentication
})

export default rootReducer