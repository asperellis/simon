import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ask } from 'what-input';
import Dropdown from './../../components/Dropdowns/Dropdown';
import Search from './../../components/Search/Search';
import VipLogin from './../../components/Forms/VipLogin';
import FadeInDown from './../Animations/FadeInDown';
import styles from './Header.css';
import SearchIcon from './../../images/icons/search.svg';
import CloseIcon from './../../images/icons/close.svg';
import SimonLogo from './../../images/logos/simon.svg';
import AdminLogo from './../../images/logos/simon-central.svg';
import PropTypes from 'prop-types';
import { docCookies } from './../../utils/docCookies';

// Dropdown Button in the global header for Premium Outlets Only
// Contains login form for user to login to VIP Club
export const HeaderNavVipDropdown = () => {
  return (
    <Dropdown
      text={'VIP CLUB'}
      buttonClasses={`${styles.headerNavLink} bold`}
      dropOnHover={true}
      direction={'right'}
    >
      {docCookies.getItem('vipUser') ? (
        <div className="dropdown-menu">
          <div>LOGGED IN!</div>
          <p>{JSON.parse(docCookies.getItem('vipUser')).name}</p>
          <p>{JSON.parse(docCookies.getItem('vipUser')).preferredOutletName}</p>
        </div>
      ) : (
        <VipLogin />
      )}
    </Dropdown>
  );
};

// Header Logo Component
// Takes an SVG logo image, a height and fill and wraps in a link back to route
const HeaderLogo = ({ Logo = SimonLogo, height = 35.6, fill = '#fff' }) => {
  return (
    <Link to="/" aria-label="Return To Homepage" className={styles.headerLogo}>
      <Logo height={height} fill={fill} className={styles.headerLogoSvg} />
    </Link>
  );
};

HeaderLogo.propTypes = {
  Logo: PropTypes.any,
  height: PropTypes.number,
  fill: PropTypes.string
};

// Header Nav Component
// Takes an array of links and outputs them as a horiz nav in the header
// The links inside the links array could be objects with text & href properties
// OR Dropdown components like a shopping cart or VIP login
const HeaderNav = ({
  links = [],
  navOpen = false,
  adminLoggedIn = false,
  toggleNav
}) => {
  // used for a11y, toggles the nav based on the last link
  const isLastNavLink = i => i === links.length - 1;

  // if youre tabbing through toggle mobile nav and tab by the last link, toggle the nav
  const toggleNavOnKey = e => {
    if (e.key === 'Tab' && !e.shiftKey) {
      toggleNav();
    }
  };

  // the root nav element has a list of classes. here's some detail
  // add open class if the nav is open to transform it into view
  // add a padding class if the user is logged in so the nav is positioned correctly event with an admin header
  return (
    <nav
      className={`${styles.headerNav} ${navOpen ? styles.open : ''} ${
        adminLoggedIn ? styles.navAdminPad : ''
      }`}
    >
      {links.map((link, index) => {
        // if the link is indeed a true link
        if (link.href) {
          return (
            <a
              href={link.href}
              className={`${styles.headerNavLink} bold`}
              key={link.text + index}
              onFocus={!navOpen ? toggleNav : undefined}
              onKeyDown={isLastNavLink(index) ? toggleNavOnKey : undefined}
            >
              {link.text}
            </a>
          );
        }

        // otherwise it's a dropdown like a shopping cart or vip login
        const DropdownButton = link;

        // TODO: this doesnt work onBlur or onFocus isLastNavLink(index) && navOpen ? toggleNavOnKey : undefined
        return <DropdownButton key={index} />;
      })}
    </nav>
  );
};

HeaderNav.propTypes = {
  links: PropTypes.array.isRequired,
  navOpen: PropTypes.bool,
  toggleNav: PropTypes.func,
  adminLoggedIn: PropTypes.bool
};

// Header Search Button
// Button that opens and closes the search bar - if you can toggle it
// Will be invisible if its one of the handfull of views that open search on load
const HeaderSearchButton = ({
  toggleSearch,
  searchOpen = false,
  canToggle = true
}) => {
  const Icon = searchOpen ? CloseIcon : SearchIcon;

  return (
    <button
      onClick={toggleSearch}
      onFocus={searchOpen ? undefined : toggleSearch}
      className={`${styles.headerSearchBtn} ${
        canToggle ? '' : styles.invisible
      }`}
      aria-label="Search By Center Store or Location"
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

HeaderSearchButton.propTypes = {
  toggleSearch: PropTypes.func.isRequired,
  searchOpen: PropTypes.bool.isRequired,
  canToggle: PropTypes.bool.isRequired
};

// Admin Header
// Shown only when an admin is logged into the CMS
// Constant set of links used temp. Basically another header with no mobile nav / search capabilities
const AdminHeader = () => {
  const NAV_LINKS = [
    { text: 'HOME', href: 'https://www.simon.com' },
    { text: 'PROFILE', href: 'https://www.simon.com' },
    { text: 'CHANGE PASSWORD', href: 'https://www.simon.com' },
    { text: 'LOGOUT', href: 'https://www.simon.com' }
  ];

  return (
    <div className={styles.adminHeader}>
      <div className="container">
        <div className={styles.headerContent}>
          <HeaderLogo Logo={AdminLogo} fill={'#000'} />
          <HeaderNav links={NAV_LINKS} />
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

  static defaultProps = {
    searchSettings: { include: true, toggle: true },
    adminLoggedIn: false,
    theme: { logo: SimonLogo, links: [], search: {} }
  };

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
        searchOpen: this.props.searchSettings.toggle ? false : true,
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
      adminLoggedIn,
      theme,
      userLocation,
      getUserLocation
    } = this.props;

    return (
      <header className={styles.header}>
        {adminLoggedIn && <AdminHeader />}
        <div className="container">
          <div className={styles.headerContent}>
            <button
              aria-label="Toggle Site Navigation"
              className={`${styles.headerNavBtn} ${navOpen ? styles.open : ''}`}
              onClick={this.toggleNav}
              onFocus={() => {
                if (ask() === 'keyboard') {
                  this.toggleNav();
                }
              }}
            >
              <span className={styles.headerNavBtnIcon} />
            </button>
            <HeaderLogo Logo={theme.logo} />
            <HeaderNav
              links={theme.links}
              navOpen={navOpen}
              toggleNav={this.toggleNav}
              adminLoggedIn={adminLoggedIn}
            />
            {searchSettings.include && (
              <HeaderSearchButton
                toggleSearch={this.toggleSearch}
                searchOpen={searchOpen}
                canToggle={searchSettings.toggle}
              />
            )}
          </div>
        </div>
        <FadeInDown in={searchSettings.include && searchOpen} duration={300}>
          <Search
            canToggle={searchSettings.toggle}
            quickLinks={theme.search.quickLinks}
            toggleSearch={this.toggleSearch}
            userLocation={userLocation}
            getUserLocation={getUserLocation}
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
  theme: PropTypes.object.isRequired,
  searchSettings: PropTypes.object.isRequired,
  adminLoggedIn: PropTypes.bool.isRequired
};

export default Header;
