import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ask } from 'what-input';
import Search from './../../components/Search/Search';
import FadeInDown from './../Animations/FadeInDown';
import styles from './Header.css';
import SearchIcon from './../../images/icons/search.svg';
import CloseIcon from './../../images/icons/close.svg';
import AdminLogo from './../../images/logos/premium-outlets.svg';

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
  const Logo = props.Logo;
  return (
    <Link to="/" aria-label="Simon homepage" className={styles.headerLogo}>
      <Logo
        width={90.5}
        height={35.6}
        fill={props.fill || '#fff'}
        viewBox={'0 0 90.5 35.6'}
        className={styles.headerLogoSvg}
      />
    </Link>
  );
};

const HeaderNav = props => {
  // links in the header - default
  const navLinks = props.links || [
    { text: 'SHOPPERS', href: 'https://www.simon.com' },
    { text: 'BUSINESS', href: 'https://www.simon.com' },
    { text: 'INVESTORS', href: 'https://www.simon.com' },
    { text: 'CAREERS', href: 'https://www.simon.com' },
    { text: 'CONTACT', href: 'https://www.simon.com' }
  ];

  const navClasses = [
    styles.headerNav,
    props.navOpen ? styles.open : '',
    props.userLoggedIn ? styles.navAdminPad : ''
  ].join(' ');

  return (
    <nav className={navClasses}>
      {navLinks.map(link => (
        <a
          href={link.href}
          className={[styles.headerNavLink, 'bold'].join(' ')}
          key={link.text}
        >
          {link.text}
        </a>
      ))}
    </nav>
  );
};

const HeaderSearchButton = ({ onClick, searchOpen, ...attributes }) => {
  const Icon = searchOpen ? CloseIcon : SearchIcon;
  return (
    <button
      onClick={onClick}
      className={styles.headerSearchBtn}
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
          <HeaderLogo Logo={AdminLogo} fill={'#000'} />
          <HeaderNav links={navLinks} />
        </div>
      </div>
    </div>
  );
};

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchOpen: !this.props.canToggle || false,
      navOpen: false
    };

    this.toggleSearch = this.toggleSearch.bind(this);
    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleSearch() {
    this.setState(
      { searchOpen: !this.state.searchOpen, navOpen: false },
      () => {
        document.documentElement.classList.remove(styles.headerNavOpen);
      }
    );
  }

  toggleNav() {
    const htmlTag = document.documentElement;
    this.setState({ navOpen: !this.state.navOpen, searchOpen: false }, () => {
      if (this.state.navOpen) {
        htmlTag.classList.add(styles.headerNavOpen);
      } else {
        htmlTag.classList.remove(styles.headerNavOpen);
      }
    });
  }

  render() {
    const { navOpen, searchOpen } = this.state;
    const {
      search,
      location,
      getUserLocation,
      canToggle,
      userLoggedIn
    } = this.props;

    return (
      <header className={styles.header}>
        <a href="#site-content" className={styles.headerSkipToContent}>
          Skip To Content
        </a>
        {userLoggedIn && <AdminHeader />}
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
            <HeaderLogo Logo={this.props.Logo} />
            <HeaderNav navOpen={navOpen} userLoggedIn={userLoggedIn} />
            {search &&
              canToggle && (
                <HeaderSearchButton
                  onClick={this.toggleSearch}
                  searchOpen={searchOpen}
                  onFocus={!canToggle || this.toggleSearch}
                />
              )}
          </div>
        </div>
        <FadeInDown in={search && searchOpen} duration={300}>
          <Search
            location={location}
            getUserLocation={getUserLocation}
            canToggle={canToggle}
          />
        </FadeInDown>
      </header>
    );
  }
}

export default Header;
