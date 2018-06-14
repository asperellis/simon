import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.css';
import SearchIcon from './../../images/icons/search.svg';
import SocialIcons from './../SocialIcons/SocialIcons';
import PropTypes from 'prop-types';

// Full width bar banner for footer.
// Displays text wrapped in a link both provided through props from theme
const FooterBanner = ({
  href = 'https://www.simon.com/mall-insider',
  text = 'BECOME A MALL INSIDER. JOIN TODAY'
}) => {
  return (
    <a href={href} className={`${styles.footerBannerLink} bold`}>
      {text}
    </a>
  );
};

FooterBanner.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

// Horizontal Row of Social Icons for given theme and a Link to the Search Page
const FooterSocialAndSearch = ({ socialNetworks = {} }) => {
  return (
    <div className={styles.footerRow}>
      {socialNetworks && (
        <SocialIcons width={25} height={25} {...socialNetworks} />
      )}
      <Link to={'/search'} className={`${styles.footerSearchLink} bold`}>
        <SearchIcon
          width={23}
          height={23}
          fill={'#000'}
          viewBox={'0 0 23 23'}
          className={styles.footerSearchIcon}
        />
        {'FIND ANOTHER SIMON CENTER'}
      </Link>
    </div>
  );
};

FooterSocialAndSearch.propTypes = {
  socialNetworks: PropTypes.object
};

// Columns of links displayed in the form of a header followed by a set of related links
const FooterLinks = ({ links = [] }) => {
  if (links.length === 0) {
    return false;
  }

  return (
    <div className={styles.footerLinks}>
      {links.map(linkGroup => (
        <div className={styles.footerLinksColumn} key={linkGroup.name}>
          <div className={`${styles.footerLinkHeader} bold`}>
            {linkGroup.name}
          </div>
          <nav className={linkGroup.wrap ? styles.footerLinksWrap : ''}>
            {linkGroup.links.map(link => (
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

FooterLinks.propTypes = {
  links: PropTypes.array.isRequired
};

// Legal Information and Links
const FooterLegal = () => {
  return (
    <div className={styles.footerLegal}>
      COPYRIGHT<span className="nosup">©</span> 1999-2018, SIMON PROPERTY GROUP,
      L.P. ALL RIGHTS RESERVED.<br />By continuing past this page and/or using
      this site, you agree to abide by the{' '}
      <a
        href="http://www.simon.com/legal"
        title="View Our Website Terms Of Use"
      >
        Terms of Use
      </a>{' '}
      for this site, which prohibit commercial use of any information on this
      site. View our{' '}
      <a
        href="http://www.simon.com/legal/privacy"
        title="Understand Our Privacy Policy"
      >
        Privacy Policy
      </a>,{' '}
      <a
        href="http://www.simon.com/legal/cookies"
        title="Understand Our Cookie Policy"
      >
        Cookie Policy
      </a>{' '}
      &amp; Your{' '}
      <a
        href="http://www.simon.com/legal/california-privacy"
        title="Review Your California Privacy Rights"
      >
        California Privacy Rights
      </a>. Simon values your privacy, manage your{' '}
      <span className="evidon-notice-link" />
    </div>
  );
};

/*
  Simon Footer - theme prop required from layout which includes, all theme specific links for presentational components

  Full width small banner to link to ad content
  FooterSocialAndSearch: Social Icons for the theme along with a link to search
  FooterLegal: Legal text and links
*/
const Footer = ({ theme = {} }) => {
  return (
    <footer className={styles.footer}>
      <FooterBanner {...theme.banner} />
      <div className="container">
        <FooterSocialAndSearch socialNetworks={theme.socialNetworks} />
        <FooterLinks links={theme.links} />
        <FooterLegal />
      </div>
    </footer>
  );
};

Footer.propTypes = {
  theme: PropTypes.object.isRequired
};

export default Footer;
