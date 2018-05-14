// types
export const GET_USER_LOCATION = 'GET_USER_LOCATION';
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
