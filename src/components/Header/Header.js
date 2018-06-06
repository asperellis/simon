import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ask } from 'what-input';
import { connect } from 'react-redux';
import Dropdown from './../../components/Dropdowns/Dropdown';
import Search from './../../components/Search/Search';
import FadeInDown from './../Animations/FadeInDown';
import styles from './Header.css';
import SearchIcon from './../../images/icons/search.svg';
import CloseIcon from './../../images/icons/close.svg';
import SimonLogo from './../../images/logos/simon.svg';
import AdminLogo from './../../images/logos/simon-central.svg';
import PropTypes from 'prop-types';

const mapStateToProps = state => {
  return {
    user: state.user,
    searchSettings: state.searchSettings
  };
};

// Dropdown Button in the global header for Premium Outlets Only
// Contains login form for user to login to VIP Club
export const HeaderNavVipDropdown = props => {
  return (
    <Dropdown
      text={'VIP CLUB'}
      buttonClasses={`${styles.headerNavLink} bold`}
      dropOnHover={true}
      direction={'right'}
    >
      {props.userLoggedIn ? (
        <div>LOGGED IN!</div>
      ) : (
        <div className="dropdown-menu">
          <div>VIP CLUB</div>
          <p>
            Join the VIP Shoppers Club for free access to exclusive VIP offers
            online.
          </p>
          <div>
            <a
              href="https://www.premiumoutlets.com/vip/register"
              className="btn btn-primary"
            >
              JOIN THE VIP SHOPPER CLUB
            </a>
          </div>
          <div>ALREADY A MEMBER?</div>
          <div className="dropdown-item">
            <form className="form-with-header js-floating-labels">
              <div className="form-group">
                <label htmlFor="email" className="floating">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="EMAIL ADDRESS"
                  id="email"
                  name="email"
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="floating">
                  PASSWORD
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="PASSWORD"
                  id="password"
                  name="password"
                  maxLength="15"
                  autoComplete="off"
                />
              </div>
              <div className="form-group clearfix">
                <div className="checkbox pull-xs-left">
                  <label htmlFor="stay-logged-in">
                    <input
                      type="checkbox"
                      id="stay-logged-in"
                      name="stayloggedin"
                      value="false"
                      data-parsley-multiple="stayloggedin"
                    />
                    <span className="c-indicator" />
                    Stay Logged In
                  </label>
                </div>
                <a
                  className="pull-xs-right forgot-password"
                  href="https://www.premiumoutlets.com/vip/forgot-password"
                >
                  <small>Forgot Password?</small>
                </a>
              </div>
              <input
                type="submit"
                id="submit"
                name="submit"
                value="LOGIN"
                className="btn btn-primary"
              />
            </form>
          </div>
        </div>
      )}
    </Dropdown>
  );
};

const HeaderNavButton = ({ onClick, navOpen, ...attributes }) => {
  const classNames = [styles.headerNavBtn, navOpen ? styles.open : ''].join(
    ' '
  );
  return (
    <button
      aria-label="Toggle Site Navigation"
      className={classNames}
      onClick={onClick}
      {...attributes}
    >
      <span className={styles.headerNavBtnIcon} />
    </button>
  );
};

const HeaderLogo = props => {
  const Logo = props.logo;
  return (
    <Link to="/" aria-label="Simon homepage" className={styles.headerLogo}>
      <Logo
        height={props.height || 35.6}
        fill={props.fill || '#fff'}
        className={styles.headerLogoSvg}
      />
    </Link>
  );
};

const HeaderNav = props => {
  const navClasses = [
    styles.headerNav,
    props.navOpen ? styles.open : '',
    props.adminLoggedIn ? styles.navAdminPad : ''
  ].join(' ');
  const isLastLink = i => i === props.links.length - 1;
  const toggleNavOnKey = e => {
    if (e.key === 'Tab' && !e.shiftKey) {
      props.toggleNav();
    }
  };

  return (
    <nav className={navClasses}>
      {props.links.map((link, index) => {
        if (link.href) {
          return (
            <a
              href={link.href}
              className={[styles.headerNavLink, 'bold'].join(' ')}
              key={link.text + index}
              onFocus={!props.navOpen ? props.toggleNav : undefined}
              onKeyDown={isLastLink(index) ? toggleNavOnKey : undefined}
            >
              {link.text}
            </a>
          );
        }
        const DropdownLink = link;
        return (
          <DropdownLink
            key={index}
            onBlur={
              isLastLink(index) && props.navOpen ? toggleNavOnKey : undefined
            }
            onFocus={
              isLastLink(index) && !props.navOpen ? toggleNavOnKey : undefined
            }
          />
        );
      })}
    </nav>
  );
};

const HeaderSearchButton = ({
  onClick,
  searchOpen,
  className,
  ...attributes
}) => {
  const Icon = searchOpen ? CloseIcon : SearchIcon;
  return (
    <button
      onClick={onClick}
      className={[styles.headerSearchBtn, className].join(' ')}
      aria-label="Search By Center Store or Location"
      {...attributes}
    >
      <Icon
        width={23}
        height={23}
        fill={searchOpen ? '#757575' : '#fff'}
        viewBox={'0 0 23 23'}
        className={styles.headerSearchIcon}
      />
    </button>
  );
};

const AdminHeader = () => {
  const navLinks = [
    { text: 'HOME', href: 'https://www.simon.com' },
    { text: 'PROFILE', href: 'https://www.simon.com' },
    { text: 'CHANGE PASSWORD', href: 'https://www.simon.com' },
    { text: 'LOGOUT', href: 'https://www.simon.com' }
  ];
  return (
    <div className={styles.adminHeader}>
      <div className="container">
        <div className={styles.headerContent}>
          <HeaderLogo logo={AdminLogo} fill={'#000'} />
          <HeaderNav links={navLinks} />
        </div>
      </div>
    </div>
  );
};

/*
  Header Component

  Simon branded bar at the top of a layout.
  Includes:
  AdminHeader: admin header for logged in admins offering cms urls
  HeaderLogo: svg logo provided by the theme prop
  HeaderNav: Nav of links provided by the theme prop
  Mobile Nav Button: Hamburger nav for mobile nav toggling
  Search: Component for globally searching throughout the site browsing experience
*/
class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // if the searchSettings disallow toggling then the search bar should always be open
      searchOpen: this.props.searchSettings.toggle ? true : false,
      navOpen: false
    };

    this.toggleSearch = this.toggleSearch.bind(this);
    this.toggleNav = this.toggleNav.bind(this);
  }

  static getDerivedStateFromProps(nextProps) {
    // if the search can toggle, close the search otherwise open it
    return { searchOpen: !nextProps.searchSettings.toggle };
  }

  // toggle the search, close the mobile nav - they both shouldn't be open at the same time
  // remove class off the documentElement which sets overflow to hidden for the mobile nav
  toggleSearch() {
    this.setState(
      prevState => ({
        searchOpen: !prevState.searchOpen,
        navOpen: false
      }),
      document.documentElement.classList.remove(styles.headerNavOpen)
    );
  }

  // toggle the mobile navigation, close the search - they both shouldn't be open at the same time
  // add class off the documentElement which sets overflow to hidden for the mobile nav
  toggleNav() {
    this.setState(
      prevState => ({
        searchOpen: this.props.searchSettings.toggle ? true : false,
        navOpen: !prevState.navOpen
      }),
      () => {
        if (this.state.navOpen) {
          document.documentElement.classList.add(styles.headerNavOpen);
        } else {
          document.documentElement.classList.remove(styles.headerNavOpen);
        }
      }
    );
  }

  render() {
    const { navOpen, searchOpen } = this.state;
    const {
      searchSettings,
      user,
      theme = { logo: SimonLogo, links: [], search: {} }
    } = this.props;
    const adminLoggedIn = user.status === 'LOGGED_IN';

    return (
      <header className={styles.header}>
        {adminLoggedIn && <AdminHeader />}
        <div className="container">
          <div className={styles.headerContent}>
            <HeaderNavButton
              onClick={this.toggleNav}
              onFocus={() => {
                if (ask() === 'keyboard') {
                  this.toggleNav();
                }
              }}
              navOpen={navOpen}
            />
            <HeaderLogo logo={theme.logo} />
            <HeaderNav
              links={theme.links}
              navOpen={navOpen}
              toggleNav={this.toggleNav}
              adminLoggedIn={adminLoggedIn}
            />
            {searchSettings.include && (
              <HeaderSearchButton
                onClick={this.toggleSearch}
                searchOpen={searchOpen}
                onFocus={searchOpen ? undefined : this.toggleSearch}
                className={searchSettings.toggle ? '' : styles.invisible}
              />
            )}
          </div>
        </div>
        <FadeInDown in={searchSettings.include && searchOpen} duration={300}>
          <Search
            canToggle={searchSettings.toggle}
            quickLinks={theme.search.quickLinks}
            toggleSearch={this.toggleSearch}
          />
        </FadeInDown>
        {navOpen && (
          <div
            role={'presentation'}
            className={styles.headerNavOverlay}
            onClick={this.toggleNav}
            onKeyPress={this.toggleNav}
            tabIndex={-1}
          />
        )}
      </header>
    );
  }
}

Header.propTypes = {
  theme: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Header);
