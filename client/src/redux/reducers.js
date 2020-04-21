import { combineReducers } from 'redux';
import { authentication }  from './reducers/user.reducers'
import { alert } from './reducers/alert.reducers'
import courses from './reducers/coursesReducer'
import settings from './settings/reducer';
import menu from './menu/reducer';
import  event   from './reducers/event.reducers'

const reducers = combineReducers({
  alert,
  authentication,
  menu,
  settings,
  courses,
  event

});

export default reducers;