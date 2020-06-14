import { combineReducers } from 'redux';
import { authentication }  from './reducers/user.reducers'
import { alert } from './reducers/alert.reducers'
import { registration } from './reducers/registeration.reducers'
import settings from './settings/reducer';
import menu from './menu/reducer';
import  projects  from './reducers/Projects.reducers'
import  categories  from './reducers/categories.reducers'
import subjects from './reducers/subjects.reducers'
const reducers = combineReducers({
  alert,
  registration,
  authentication,
  menu,
  settings,
  projects,
  categories,
  subjects
});

export default reducers;