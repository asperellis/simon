// user related reducer for managing things like logged in and location
export const user = (
  state = { location: {}, status: 'LOGGED_OUT' },
  action
) => {
  if (action.type === 'GET_USER_LOCATION') {
    return { ...state, location: action.location };
  } else if (action.type === 'LOGIN_USER' || action.type === 'LOGOUT_USER') {
    return { ...state, status: action.status };
  }

  return state;
};
