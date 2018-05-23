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
    if (
      this.props.match.params.query === 'your-location' &&
      !this.props.user.location.latitude
    ) {
      this.props.getUserLocation();
    }
  }

  componentWillUnmount() {
    this.props.setSearchToggle(true);
  }

  render() {
    const { query } = this.props.match.params;
    const { location } = this.props.user;
    const locationSearch = query === 'your-location';
    return (
      <div className="container">
        <h1>
          {query
            ? 'Search Page searching for ' + query
            : 'No Search query so show all the things'}
        </h1>
        {location &&
          location.latitude &&
          locationSearch && (
            <p>
              LOCATION SEARCH! BOOM:<br />
              {`Latitude ${location.latitude}, 
              Longitude ${location.longitude}`}
            </p>
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
