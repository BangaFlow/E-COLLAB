import * as types from "../constants/subjects.constants";

const INIT_STATE = {
  subjects: [],
};
export default ( state = INIT_STATE.subjects, action )=>{
    debugger;
  switch(action.type){
    case types.LOAD_SUBJECTS_SUCCESS :
      debugger;
         return action.subjects;
         case types.ADD_SUBJECTS_SUCCESS:
            return [...state, { ...action.subject }];
            case types.ADD_TASK_SUCCESS:
              return [...state, { ...action.subject }];
              case types.UPDATE_SUBJECT_SUCCESS:
              return state.map((item) =>
               item.id === action.subject.id ? action.subject : item
           );
              case types.DELETE_SUBJECT_SUCCESS:
              return state.filter((item) => item.id !== action.subject.id);
     

  default : 
      return state ;
  }


};