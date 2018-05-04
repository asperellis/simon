// types
export const GET_USER_LOCATION = 'GET_USER_LOCATION';

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
