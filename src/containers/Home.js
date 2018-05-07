import React from 'react';

const Home = props => {
  return (
    <div>
      Home Page
      {Object.keys(props).map(k => <p key={k}>{k}</p>)}
    </div>
  );
};

export default Home;
