import { combineReducers } from 'redux';
import { authentication }  from './reducers/user.reducers'
import { alert } from './reducers/alert.reducers'
import courses from './reducers/coursesReducer'
import settings from './settings/reducer';
import menu from './menu/reducer';
import  event   from './reducers/event.reducers'
import  workShop   from './reducers/workShop.reducers'
import  meeting   from './reducers/meeting.reducers'
const reducers = combineReducers({
  alert,
  authentication,
  menu,
  settings,
  courses,
  event,
  workShop,
  meeting

});

export default reducers;