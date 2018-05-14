import React, { Component } from 'react';
import styles from './DefaultLayout.css';
import Header from './../components/Header/Header';
import Footer from './../components/Footer/Footer';
import SimonLogo from './../images/logos/simon.svg';
import PremiumOutletsLogo from './../images/logos/premium-outlets.svg';
import CookieMessage from './../components/CookieMessage/CookieMessage';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUserLocation } from './../actions/App';
import { docCookies } from './../utils/utils';

const THEMES = {
  simon: {
    logo: SimonLogo,
    footer: {
      banner: {
        text: 'BECOME A MALL INSIDER. JOIN TODAY',
        href: 'https://www.simon.com/mall-insider'
      }
    }
  },
  premiumOutlets: {
    logo: PremiumOutletsLogo,
    footer: {
      banner: {
        text: 'JOIN THE VIP CLUB TODAY.',
        href: 'https://www.premiumoutlets.com/vip/register'
      }
    }
  }
};

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

class DefaultLayout extends Component {
  render() {
    const theme = THEMES[this.props.theme];
    const searchCanToggle = true;
    const user = this.props.user;
    let mainContentPad = 1;
    if (user.status === 'LOGGED_IN') {
      mainContentPad++;
    }
    if (!searchCanToggle) {
      mainContentPad++;
    }

    return (
      <div>
        {theme ? (
          <div>
            <Header
              Logo={theme.logo}
              search={true}
              canToggle={searchCanToggle}
              location={user.location}
              getUserLocation={this.props.getUserLocation}
              vipDropdown={false}
              userLoggedIn={user.status === 'LOGGED_IN'}
            />
            {!docCookies.getItem('seen_cookie_message') && <CookieMessage />}
            <main
              className={styles[`mainContentPad${mainContentPad}`]}
              id="site-content"
              tabIndex="-1"
            >
              {this.props.children}
            </main>
            <Footer banner={theme.footer.banner} />
          </div>
        ) : (
          this.props.children
        )}
      </div>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DefaultLayout)
);
