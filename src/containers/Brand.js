import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserLocation } from './../actions/User';
import Button from './../components/Buttons/Button';
import SEO from './../components/SEO/SEO';

const mapDispatchToProps = dispatch => {
  return {
    getUserLocation: () => dispatch(getUserLocation())
  };
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

class Brand extends Component {
  render() {
    const { brandName } = this.props.match.params;
    const { location } = this.props.user;
    const userHasLocation = location && location.latitude && location.longitude;
    return (
      <div className="container">
        <SEO url="search" />
        <Link to="/search">Back To Search Results</Link>
        <h1>{'Brand Page for ' + brandName}</h1>
        {userHasLocation && (
          <p>
            We Could Order Brand Locations by User Location:<br />
            {`Latitude ${location.latitude}, 
              Longitude ${location.longitude}`}
          </p>
        )}
        {!userHasLocation && (
          <div>
            <p>
              Location is blocked OR user has manually hit this route and must
              ask for location based results again
            </p>
            <Button onClick={this.props.getUserLocation}>
              CLICK TO ORDER BY LOCATION
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Brand);
