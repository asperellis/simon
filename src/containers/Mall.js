import React, { Component } from 'react';

class Mall extends Component {
  render() {
    const mall = this.props.match.params.shortName;
    return (
      <div className="container">
        {mall && (
          <div>
            <div>Weather and Mall nav would be here</div>
            <h1>{mall ? 'Mall Page for ' + mall : 'Show all the malls'}</h1>
            <p>
              This is an example of a page with a search closed by default.
              Allowing the user to toggle open the search as needed.
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default Mall;
