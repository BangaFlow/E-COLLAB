import { combineReducers } from 'redux';
import { authentication }  from './reducers/user.reducers'
import { alert } from './reducers/alert.reducers'
import courses from './reducers/coursesReducer'
import settings from './settings/reducer';
import menu from './menu/reducer';
import  projects  from './reducers/Projects.reducers'
import  categories  from './reducers/categories.reducers'
import subjects from './reducers/subjects.reducers'
import  event   from './reducers/event.reducers'
import  workShop   from './reducers/workShop.reducers'
import  meeting   from './reducers/meeting.reducers'
import quiz from './reducers/quiz.reducers'
import { registration } from './reducers/registeration.reducers'
import skills from './reducers/skills.reducers'
import teams from './reducers/teams.reducers'
import profile from './reducers/profile.reducers'
import {currentUser, currentUserData, userRepos,} from './reducers/github.reducers'

const reducers = combineReducers({
  alert,
  registration,
  authentication,
  menu,
  settings,
  projects,
  categories,
  subjects,
  courses,
  event,
  workShop,
  meeting,
  quiz,
  skills,
  teams,
  profile,
  currentUser,
  currentUserData,
  userRepos,
});

export default reducers;