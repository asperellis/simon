// USER related actions
// action types
export const GET_USER_LOCATION = 'GET_USER_LOCATION';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

// action creators
export function getUserLocation() {
  // for errors or location blocks we set the location to null
  const defaultAction = {
    type: GET_USER_LOCATION,
    location: null
  };

  return dispatch => {
    if (navigator) {
      const geolocation = navigator.geolocation;
      // get the users position and dispatch the coords if successful
      // if error or timeout use the default which sets location from {} to null
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
      // set location to null because we have no navigator api within the users browser
      dispatch(defaultAction);
    }
  };
}

// basic log in log out actions for testing simon central ui. not prod code
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
