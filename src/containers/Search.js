import React from 'react';

const Search = props => {
  return (
    <h1>
      {props.match.params.query
        ? 'Search Page searching for ' + props.match.params.query
        : 'No Search query so show all the things'}
    </h1>
  );
};

export default Search;
