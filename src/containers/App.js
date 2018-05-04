import React, { Component } from 'react';
import styles from './App.css';
import Header from './../components/Header/Header';
import Footer from './../components/Footer/Footer';
import { connect } from 'react-redux';
import { getUserLocation } from './../actions/App';

const mapStateToProps = state => {
  return {
    location: state.location
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserLocation: () => dispatch(getUserLocation())
  };
};

class AppShell extends Component {
  render() {
    return (
      <div className={styles.app}>
        <Header
          search={true}
          location={this.props.location}
          getUserLocation={this.props.getUserLocation}
        />
        <main className={styles.appContent}>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1>This is a React Simon Wrapper</h1>
                <p>
                  {this.props.location &&
                    'Your Location is Lat: ' +
                      (this.props.location && this.props.location.latitude) +
                      ' Long: ' +
                      (this.props.location && this.props.location.longitude)}
                </p>
                <p>To test out the possibility of using on business site.</p>
                <p>Data and Store handling still needed</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(AppShell);

export default App;
