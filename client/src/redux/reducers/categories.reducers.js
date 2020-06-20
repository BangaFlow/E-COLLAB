import * as types from "../constants/categories.constants";

const INIT_STATE = {
  categories: [],
};
export default ( state = INIT_STATE.categories, action )=>{
  switch(action.type){
      case types.LOAD_TYPE_PROJECTS_SUCCESS :
         return action.categories;
         case types.ADD_PROJECT_TO_CATEGORY_SUCCESS:
      return state.map((item) =>
        item.id === action.category.id ? action.category : item
      );
      case types.ADD_TYPE_PROJECTS_SUCCESS:
      return [...state, { ...action.category }];
      case types.UPDATE_CATEGORY_SUCCESS:
        return state.map((item) =>
             item.id === action.category.id ? action.category : item
         );
            case types.DELETE_CATEGORY_SUCCESS:
                 return state.filter((item) => item.id !== action.category.id);

  default : 
      return state ;
  }


};