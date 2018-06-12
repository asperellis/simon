// UI related actions
// action types
export const SET_SEARCH = 'SET_SEARCH';
export const SET_SEARCH_TOGGLE = 'SET_SEARCH_TOGGLE';

// action creators
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
