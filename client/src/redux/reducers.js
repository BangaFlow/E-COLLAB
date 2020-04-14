import { combineReducers } from 'redux';
import { authentication }  from './reducers/user.reducers'
<<<<<<< HEAD
import { alert } from './reducers/alert.reducers'
=======
>>>>>>> 66adb6320efd054ca3537e34a7179b435e9ea035
import settings from './settings/reducer';
import menu from './menu/reducer';


const reducers = combineReducers({
<<<<<<< HEAD
  alert,
=======
>>>>>>> 66adb6320efd054ca3537e34a7179b435e9ea035
  authentication,
  menu,
  settings
});

export default reducers;