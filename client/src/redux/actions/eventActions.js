import * as types from '../constants/event.constant'
import * as eventApi from "../../services/event.service"

export function loadEventSuccess(event) {
    debugger
    return { type: types.LOAD_EVENT_SUCCESS, event }
}

export function getAllEvent() {
    return function (dispatch) {
        debugger
        return eventApi
               .getEvents()
               .then(event =>{dispatch(loadEventSuccess(event));
               })
               .catch(error => {throw error();
               });
               
               
    

    }

}