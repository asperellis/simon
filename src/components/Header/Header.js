import React, { Component } from 'react';
import Search from './../../components/Search/Search';
import FadeInDown from './../Animations/FadeInDown';
import styles from './Header.css';
import Logo from './../../images/logos/simon.svg';
import SearchIcon from './../../images/icons/search.svg';
import CloseIcon from './../../images/icons/close.svg';

const HeaderNavButton = ({ onClick, navOpen, ...attributes }) => {
  const classNames = [styles.headerNavBtn, navOpen ? styles.open : ''].join(
    ' '
  );
  return (
    <button className={classNames} onClick={onClick} {...attributes}>
      <span className={styles.headerNavBtnIcon} />
    </button>
  );
};

const HeaderLogo = props => {
  return (
    <a href={props.url} className={styles.headerLogo}>
      <Logo
        width={90.5}
        height={35.6}
        fill={'#fff'}
        viewBox={'0 0 90.5 35.6'}
        className={styles.headerLogoSvg}
      />
    </a>
  );
};

const HeaderNav = props => {
  // links in the header - default
  const navLinks = [
    { text: 'SHOPPERS', href: 'https://www.simon.com' },
    { text: 'BUSINESS', href: 'https://www.simon.com' },
    { text: 'INVESTORS', href: 'https://www.simon.com' },
    { text: 'CAREERS', href: 'https://www.simon.com' },
    { text: 'CONTACT', href: 'https://www.simon.com' }
  ];

  const navClasses = [styles.headerNav, props.navOpen ? styles.open : ''].join(
    ' '
  );

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

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchOpen: this.props.searchOpenOnLoad || false,
      navOpen: false
    };

    this.toggleSearch = this.toggleSearch.bind(this);
    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleSearch() {
    this.setState({ searchOpen: !this.state.searchOpen, navOpen: false });
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
    const { search, location, getUserLocation } = this.props;

    return (
      <div>
        <header className={styles.header}>
          <div className="container">
            <div className={styles.headerContent}>
              <HeaderNavButton onClick={this.toggleNav} navOpen={navOpen} />
              <HeaderLogo url={'https://www.simon.com'} />
              <HeaderNav navOpen={navOpen} />
              {search && (
                <HeaderSearchButton
                  onClick={this.toggleSearch}
                  searchOpen={searchOpen}
                />
              )}
            </div>
          </div>
        </header>
        <FadeInDown in={search && searchOpen} duration={300}>
          <Search location={location} getUserLocation={getUserLocation} />
        </FadeInDown>
      </div>
    );
  }
}

export default Header;
