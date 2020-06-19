import * as types from '../constants/workShop.constant'
import * as workShopApi from "../../services/workshop.services"

export function loadWorkShopSuccess(workShop) {
    debugger
    return { type: types.LOAD_WORKSHOP_SUCCESS, workShop }
  }

  export function updateSuccess(workShop) {
    debugger
    return { type: types.ADD_WORKSHOP_SUCCESS, workShop }
  }

  export function getAll() {
    return function (dispatch) {
      debugger
      return workShopApi
        .getWorkshops()
        .then(workShop => {
          dispatch(loadWorkShopSuccess(workShop));
        })
        .catch(error => {
          throw error();
        });
    }
}


export function addWorkShop(workShopName, workShop_description ,workShop_Requirments, workShop_Certification, workShop_startTime, workShop_endTime, workShop_goals) {
  return function (dispatch) {
    debugger
    return workShopApi
      .addWorkshop(workShopName, workShop_description ,workShop_Requirments, workShop_Certification, workShop_startTime, workShop_endTime, workShop_goals)
      .then(workShop => {
        dispatch(updateSuccess(workShop));
      })
      .catch(error => {
        throw error();
      });
  }
}





