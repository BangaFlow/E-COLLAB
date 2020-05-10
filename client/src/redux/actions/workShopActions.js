import * as types from '../constants/workShop.constant'
import * as workShopApi from "../../services/workshop.services"

export function loadWorkShopSuccess(workShop) {
    debugger
    return { type: types.LOAD_WORKSHOP_SUCCESS, workShop }
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




