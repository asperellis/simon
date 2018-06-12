// depending on the page the global search could be open by default or collapsed
// when open by default this presents a problem due to it overlapping content so page content must be pushed down by height of search bar
// this isn't the case with a closed toggleable bar
// to fix this I put a global search settings state to turn off search on the few pages that open it on default
// toggle property allows the user to open and close the bar
// include property includes the search bar
export const searchSettings = (
  state = { toggle: true, include: true },
  action
) => {
  if (action.type === 'SET_SEARCH') {
    return { ...state, include: action.include };
  } else if (action.type === 'SET_SEARCH_TOGGLE') {
    return { ...state, toggle: action.toggle };
  }
  return state;
};
