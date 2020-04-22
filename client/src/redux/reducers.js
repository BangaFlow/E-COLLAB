import { combineReducers } from 'redux';
import { authentication }  from './reducers/user.reducers'
import { alert } from './reducers/alert.reducers'
import settings from './settings/reducer';
import menu from './menu/reducer';
import skills from './reducers/skills.reducers'
import teams from './reducers/teams.reducers'
import profile from './reducers/profile.reducers'


const reducers = combineReducers({
  alert,
  authentication,
  menu,
  settings,
  skills,
  teams,
  profile
});

export default reducers;