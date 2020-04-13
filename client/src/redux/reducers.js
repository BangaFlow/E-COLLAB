import { combineReducers } from 'redux';
import { authentication }  from './reducers/user.reducers'
import settings from './settings/reducer';
import menu from './menu/reducer';


const reducers = combineReducers({
  authentication,
  menu,
  settings
});

export default reducers;