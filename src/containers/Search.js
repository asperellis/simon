import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSearchToggle, getUserLocation } from './../actions/App';

const mapDispatchToProps = dispatch => {
  return {
    setSearchToggle: canToggle => dispatch(setSearchToggle(canToggle)),
    getUserLocation: () => dispatch(getUserLocation())
  };
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

class Search extends Component {
  componentDidMount() {
    this.props.setSearchToggle(false);
  }

  componentWillUnmount() {
    this.props.setSearchToggle(true);
  }

  render() {
    const { query } = this.props.match.params;
    const { location } = this.props.user;
    const locationSearch = query === 'your-location';
    const userHasLocation = location && location.latitude && location.longitude;
    return (
      <div className="container">
        <h1>
          {query
            ? 'Search Page searching for ' + query
            : 'No Search query so show all the things'}
        </h1>
        {locationSearch &&
          userHasLocation && (
          <p>
              LOCATION SEARCH! BOOM:<br />
            {`Latitude ${location.latitude}, 
              Longitude ${location.longitude}`}
          </p>
        )}
        {locationSearch &&
          !userHasLocation && (
          <div>
            <p>
                Location is blocked OR user has manually hit this route and must
                ask for location based results again
            </p>
            <button onClick={this.props.getUserLocation}>CLICK TO ASK</button>
          </div>
        )}

        <p>
          This is an example of a page with a search open by default. Toggling
          removed to disallow the bar to be closed and prevent awkward white
          space where it used to be or moving content up
        </p>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
