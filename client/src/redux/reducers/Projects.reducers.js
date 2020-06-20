import * as types from "../constants/Projects.constants";

const INIT_STATE = {
  projects: [],
};
export default ( state = INIT_STATE.projects, action )=>{

  switch(action.type){
      case types.LOAD_PROJECTS_SUCCESS :
      debugger;
         return action.projects;
         case types.ADD_NEW_PROJECT_SUCCESS:
          return [...state, { ...action.project }];
          case types.UPDATE_PROJECT_SUCCESS:
          return state.map((item) =>
               item.id === action.project.id ? action.project : item
           );
              case types.DELETE_PROJECT_SUCCESS:
                   return state.filter((item) => item.id !== action.project.id);

  default : 
      return state ;
  }


};