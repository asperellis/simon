import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logInUser, logOutUser } from './../actions/User';
import { setSearchToggle } from './../actions/UI';

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logInUser: () => dispatch(logInUser()),
    logOutUser: () => dispatch(logOutUser()),
    setSearchToggle: canToggle => dispatch(setSearchToggle(canToggle))
  };
};

class Home extends Component {
  componentDidMount() {
    this.props.setSearchToggle(false);
  }

  componentWillUnmount() {
    this.props.setSearchToggle(true);
  }

  render() {
    const { location } = this.props.user;
    return (
      <div className="container">
        <h1>Home Page</h1>
        {location &&
          location.latitude && (
          <p>
              User Location:<br />
            {`Latitude ${location.latitude},
        Longitude ${location.longitude}`}
          </p>
        )}
        <p>
          This is an example of a page with a search open by default. Toggling
          removed to disallow the bar to be closed and prevent awkward white
          space where it used to be or moving content up
        </p>
        {this.props.user.status === 'LOGGED_OUT' ? (
          <button type="button" onClick={this.props.logInUser}>
            FAKE LOGIN
          </button>
        ) : (
          <button type="button" onClick={this.props.logOutUser}>
            FAKE LOGOUT
          </button>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
