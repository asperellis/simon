import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ask } from 'what-input';
import { connect } from 'react-redux';
import { getUserLocation } from './../../actions/App';
import Dropdown from './../../components/Dropdowns/Dropdown';
import Search from './../../components/Search/Search';
import FadeInDown from './../Animations/FadeInDown';
import styles from './Header.css';
import SearchIcon from './../../images/icons/search.svg';
import CloseIcon from './../../images/icons/close.svg';
import AdminLogo from './../../images/logos/simon-central.svg';

const mapStateToProps = state => {
  return {
    user: state.user,
    search: state.search
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserLocation: () => dispatch(getUserLocation())
  };
};

export const HeaderNavVipDropdown = props => {
  return (
    <Dropdown
      text={'VIP CLUB'}
      buttonClassName={[styles.headerNavLink, 'bold'].join(' ')}
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
  const Logo = props.Logo;
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
      searchOpen: !this.props.search.toggle || false,
      navOpen: false
    };

    this.toggleSearch = this.toggleSearch.bind(this);
    this.toggleNav = this.toggleNav.bind(this);
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.search.toggle) {
      return { searchOpen: false };
    }
    return { searchOpen: !nextProps.search.toggle };
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
    this.setState(
      {
        navOpen: !this.state.navOpen,
        searchOpen: !this.props.search.toggle || false
      },
      () => {
        if (this.state.navOpen) {
          htmlTag.classList.add(styles.headerNavOpen);
        } else {
          htmlTag.classList.remove(styles.headerNavOpen);
        }
      }
    );
  }

  render() {
    const { navOpen, searchOpen } = this.state;
    const { search, user } = this.props;
    const adminLoggedIn = user.status === 'LOGGED_IN';
    return (
      <header className={styles.header}>
        <a href="#site-content" className={styles.headerSkipToContent}>
          Skip To Content
        </a>
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
            <HeaderLogo Logo={this.props.Logo} />
            <HeaderNav
              links={this.props.links}
              navOpen={navOpen}
              toggleNav={this.toggleNav}
              adminLoggedIn={adminLoggedIn}
            />
            {search.include && (
              <HeaderSearchButton
                onClick={this.toggleSearch}
                searchOpen={searchOpen}
                onFocus={searchOpen ? undefined : this.toggleSearch}
                style={search.toggle ? {} : { visibility: 'hidden' }}
              />
            )}
          </div>
        </div>
        <FadeInDown in={search.include && searchOpen} duration={300}>
          <Search
            allowLocation={user.location}
            getUserLocation={this.props.getUserLocation}
            canToggle={search.toggle}
            quickLinks={this.props.quickLinks}
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
