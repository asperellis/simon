import React from 'react';

const Search = props => {
  return (
    <div>
      {props.match.params.query
        ? 'Search Page searching for ' + props.match.params.query
        : 'No Search query so show all the things'}
      {Object.keys(props).map(k => <p key={k}>{k}</p>)}
    </div>
  );
};

export default Search;
