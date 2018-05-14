import React, { Component } from 'react';
import styles from './App.css';
import Header from './../components/Header/Header';
import Footer from './../components/Footer/Footer';
import CookieMessage from './../components/CookieMessage/CookieMessage';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUserLocation } from './../actions/App';
import { docCookies } from './../utils/utils';

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserLocation: () => dispatch(getUserLocation())
  };
};

class App extends Component {
  render() {
    return (
      <div>
        <Header
          search={true}
          searchOpenOnLoad={false}
          location={this.props.user.location}
          getUserLocation={this.props.getUserLocation}
        />
        {!docCookies.getItem('seen_cookie_message') && <CookieMessage />}
        <main className={styles.app} id="site-content" tabIndex="-1">
          {this.props.children}
        </main>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
