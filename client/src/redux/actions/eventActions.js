import * as types from '../constants/event.constant'
import * as eventApi from "../../services/event.service"

export function loadEventSuccess(event) {
  return { type: types.LOAD_EVENT_SUCCESS, event }
}

export function addEventSuccess(event) {
  return { type: types.ADD_EVENT_SUCCESS, event };
}

export function updateEventSuccess(event) {
  return { type: types.UPDATE_USER_EVENT_SUCCESS, event };
}


export function loadUserEventSuccess(event) {
  return { type: types.LOAD_USER_EVENT_SUCCESS, event }
}

export function deleteEventSuccess(event) {
  return { type: types.DELETE_USER_EVENT_SUCCESS, event }
}




/* call the api */
export function getAllEvent() {
  return function (dispatch) {
    return eventApi
      .getEvents()
      .then(event => {
        dispatch(loadEventSuccess(event));
      })
      .catch(error => {
        throw error();
      });




  }

}







export function getAllUserEvent(id) {
  return function (dispatch) {
    return eventApi
      .getUserCalendar(id)
      .then(event => {
        dispatch(loadUserEventSuccess(event));
      })
      .catch(error => {
        throw error();
      });
  }

}

export function updateEvent(id,eventName,eventType, description, date,eventOrganizer,place) {
  return function (dispatch) {
    
    return eventApi
      .updateEvent(id,eventName,eventType, description, date,eventOrganizer,place)
      .then(event => {
        dispatch(updateEventSuccess(event));
      })
      .catch(error => {
        throw error();
      });
  }

}



export function deleteEvent(id) {
  return function (dispatch) {
    
    return eventApi
      .deleteEvent(id)
      .then(event => {
        dispatch(deleteEventSuccess(event));
      })
      .catch(error => {
        throw error();
      });
  }

}




export function addEvent(eventName,eventType, description, date,eventOrganizer,place) {
  return function (dispatch) {
    return eventApi.
      addEvent(eventName,eventType, description, date,eventOrganizer,place)
      .then((event) => {
        dispatch(addEventSuccess(event));
      })
      .catch((err) => {
        throw err;
      });
  };
}