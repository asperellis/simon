import React from 'react';

const Mall = props => {
  const mall = props.match.params.mallShortName;
  return (
    <div>
      {mall && (
        <div>
          <div>WEATHER COMP</div>
          <nav>Mall Nav</nav>
        </div>
      )}
      <h1>{mall ? 'Mall Page for ' + mall : 'Show all the malls'}</h1>
    </div>
  );
};

export default Mall;
