// types
export const GET_USER_LOCATION = 'GET_USER_LOCATION';
export const SET_SEARCH = 'SET_SEARCH';
export const SET_SEARCH_TOGGLE = 'SET_SEARCH_TOGGLE';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

// creators
export function getUserLocation() {
  const defaultAction = {
    type: GET_USER_LOCATION,
    location: null
  };

  return dispatch => {
    if (navigator) {
      const geolocation = navigator.geolocation;
      geolocation.getCurrentPosition(
        position => {
          dispatch({
            ...defaultAction,
            location: position.coords
          });
        },
        () => {
          dispatch(defaultAction);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      dispatch(defaultAction);
    }
  };
}

export function logInUser() {
  return {
    type: LOGIN_USER,
    status: 'LOGGED_IN'
  };
}

export function logOutUser() {
  return {
    type: LOGOUT_USER,
    status: 'LOGGED_OUT'
  };
}

export function setSearch(include = true) {
  return {
    type: SET_SEARCH,
    include
  };
}

export function setSearchToggle(toggle = true) {
  return {
    type: SET_SEARCH_TOGGLE,
    toggle
  };
}
