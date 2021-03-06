import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUserLocation } from './../actions/User';
import { config } from './../config';

// THEMES
import { THEMES } from './Themes';

// COMPONENTS
import { default as Header } from './../components/Header/Header';
import Footer from './../components/Footer/Footer';

// UTILS
import 'what-input'; // tracks users input methods for a11y things
import loadFonts from './../utils/loadFonts';

// APP STYLES - bootstrap out of the box for grid - maybe temporary
import '!style-loader!css-loader!bootstrap/dist/css/bootstrap-reboot.min.css';
import '!style-loader!css-loader!bootstrap/dist/css/bootstrap-grid.min.css';
import './../styles/index.css'; // should we merge this and the next file?
import styles from './DefaultLayout.css';

// get user info and search settings to pass to the header
const mapStateToProps = state => {
  return {
    user: state.user,
    searchSettings: state.searchSettings
  };
};

// get user location method
const mapDispatchToProps = dispatch => {
  return {
    getUserLocation: () => dispatch(getUserLocation())
  };
};

// Default Layout
// Takes children and wraps them in a themed layout with a header and footer
// All other app level content should be included here as well
class DefaultLayout extends Component {
  constructor(props) {
    super(props);

    // currently setting theme manually. this will need to change
    this.state = {
      theme: config.theme || 'simon'
    };
  }

  componentDidMount() {
    // our font loading strategy using fontfaceobserver
    loadFonts();
  }

  render() {
    // the layout theme defined in a separate json file
    const theme = THEMES[this.state.theme];
    // from the app store
    const { user, searchSettings } = this.props;
    // a layout can currently have at most 3 bars of content in the header
    // admin header + site header + search bar open; each is 74px high
    // contentPad is the count of these items and
    // pads page content down by x * 74px through css
    const contentPad =
      1 + (user.status === 'LOGGED_IN') + !searchSettings.toggle;
    // css class to pad page content down
    const mainClass = theme ? styles[`contentPad${contentPad}`] : '';
    // id ref of the page content inside the layout
    const MAIN_CONTENT_ID = 'site-content';

    // if no theme show only the page content
    return (
      <div>
        {theme && (
          <div>
            <a href={`#${MAIN_CONTENT_ID}`} className={styles.skipToContent}>
              {'Skip To Content'}
            </a>
            <Header
              theme={theme.header}
              searchSettings={searchSettings}
              adminLoggedIn={user.status === 'LOGGED_IN'}
              userLocation={user.location}
              getUserLocation={this.props.getUserLocation}
            />
          </div>
        )}
        <main className={mainClass} id={MAIN_CONTENT_ID} tabIndex="-1">
          {this.props.children}
        </main>
        {theme && <Footer theme={theme.footer} />}
      </div>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DefaultLayout)
);
