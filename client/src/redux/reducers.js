import { combineReducers } from 'redux';
import { authentication }  from './reducers/user.reducers'
import { alert } from './reducers/alert.reducers'
import { registration } from './reducers/registeration.reducers'
import settings from './settings/reducer';
import menu from './menu/reducer';


const reducers = combineReducers({
  alert,
  registration,
  authentication,
  menu,
  settings
});

export default reducers;