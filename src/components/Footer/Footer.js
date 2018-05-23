import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.css';
import SearchIcon from './../../images/icons/search.svg';
import SocialIcons from './../SocialIcons/SocialIcons';

const FooterSocialAndSearch = () => {
  return (
    <div className={[styles.footerRow].join(' ')}>
      <SocialIcons
        width={25}
        height={25}
        facebook={'https://www.facebook.com'}
        twitter={'https://www.twitter.com'}
        youtube={'https://www.youtube.com'}
        simon={'https://www.simon.com'}
        instagram={'https://www.instagram.com'}
      />
      <Link
        to={'/search'}
        className={[styles.footerSearchLink, 'bold'].join(' ')}
      >
        <SearchIcon
          width={23}
          height={23}
          fill={'#000'}
          viewBox={'0 0 23 23'}
          className={styles.footerSearchIcon}
        />
        FIND ANOTHER SIMON CENTER
      </Link>
    </div>
  );
};

const FooterLinks = ({ links }) => {
  return (
    <div className={styles.footerLinks}>
      {links.map(group => (
        <div className={styles.footerLinksColumn} key={group.name}>
          <div className={[styles.footerLinkHeader, 'bold'].join(' ')}>
            {group.name}
          </div>
          <nav className={group.wrap ? styles.footerLinksWrap : ''}>
            {group.links.map(link => (
              <a
                className={styles.footerLink}
                href={link.href}
                key={link.text}
                title={link.text}
              >
                {link.text}
              </a>
            ))}
          </nav>
        </div>
      ))}
    </div>
  );
};

const FooterLegal = () => {
  return (
    <div className={styles.footerLegal}>
      {'COPYRIGHT© 1999-2018, SIMON PROPERTY GROUP, L.P. ALL RIGHTS RESERVED.'}
      <br />
      {'By using this site, you agree to abide by its '}
      <a href="http://www.simon.com/legal">Terms of Use</a>
      {
        ', which prohibit commercial use of any information on this site. View our '
      }
      <a href="http://www.simon.com/legal/privacy">Privacy Policy</a>
      {' / '}
      <a href="http://www.simon.com/legal/california-privacy">
        Your California Privacy Rights
      </a>.
    </div>
  );
};

const Footer = ({ banner, links }) => {
  return (
    <footer className={styles.footer}>
      <a
        href={banner.href}
        className={[styles.footerBannerLink, 'bold'].join(' ')}
      >
        {banner.text}
      </a>
      <div className="container">
        <FooterSocialAndSearch />
        <FooterLinks links={links} />
        <FooterLegal />
      </div>
    </footer>
  );
};

export default Footer;
