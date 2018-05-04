import React from 'react';
import styles from './Footer.css';
import SearchIcon from './../../images/icons/search.svg';
import SocialIcons from './../SocialIcons/SocialIcons';

const FooterBanner = props => {
  return (
    <div className={styles.footerBanner}>
      <a
        href={props.href}
        className={[styles.footerBannerLink, 'bold'].join(' ')}
      >
        {props.text}
      </a>
    </div>
  );
};

const FooterSocial = () => {
  return (
    <div className={['row', styles.footerRow].join(' ')}>
      <SocialIcons
        facebook={'https://www.facebook.com'}
        twitter={'https://www.twitter.com'}
        youtube={'https://www.youtube.com'}
        simon={'https://www.simon.com'}
        instagram={'https://www.instagram.com'}
      />
      <a
        href="https://www.simon.com/search"
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
      </a>
    </div>
  );
};

const FooterLinksColumn = ({ name, links }) => {
  return (
    <div className={styles.footerLinksColumn}>
      <div className={['bold', styles.footerLinkHeader].join(' ')}>{name}</div>
      <nav>
        {links.map(l => (
          <a
            className={styles.footerLink}
            href={l.href}
            key={l.text}
            title={l.text}
          >
            {l.text}
          </a>
        ))}
      </nav>
    </div>
  );
};

const FooterLinks = () => {
  return (
    <div className={['row', styles.footerLinks].join(' ')}>
      <FooterLinksColumn
        name={'Learn More'}
        links={[
          { href: 'http://business.simon.com/about', text: 'About Simon' },
          { href: 'http://www.simon.com/mall', text: 'See All Properties' },
          { href: 'https://www.simon.com/travel', text: 'Travel & Tourism' },
          { href: 'http://www.simon.com/brands', text: 'Brands' }
        ]}
      />
      <FooterLinksColumn
        name={'More From Simon'}
        links={[
          {
            href: 'http://www.simon.com/foundatsimon',
            text: '#foundatsimon'
          },
          { href: 'https://said.simon.com/', text: 'Simon SAID' },
          { href: 'https://family.simon.com/', text: 'Family at Simon' },
          {
            href: 'http://syf.org/',
            text: 'Simon Youth Foundation'
          }
        ]}
      />
      <FooterLinksColumn
        name={'Simon Giftcards®'}
        links={[
          {
            href: 'https://www.simon.com/giftcard/',
            text: 'Purchase a Giftcard'
          },
          {
            href: 'https://www.simon.com/giftcard/account_register.aspx',
            text: 'Register Your Card'
          },
          {
            href: 'https://www.simon.com/giftcard/card_balance.aspx',
            text: 'Check Your Balance'
          },
          { href: 'https://www.simon.com/volume/', text: 'Corporate Sales' }
        ]}
      />
      <FooterLinksColumn
        name={'Business Opportunities'}
        links={[
          {
            href: 'http://business.simon.com/advertising',
            text: 'Advertising'
          },
          { href: 'https://business.simon.com/leasing', text: 'Leasing' },
          {
            href: 'http://business.simon.com/property-services',
            text: 'Property Services'
          },
          {
            href: 'http://business.simon.com/retailer-marketing',
            text: 'Retailer Marketing'
          }
        ]}
      />
    </div>
  );
};

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <FooterBanner
        text={'BECOME A MALL INSIDER. JOIN TODAY'}
        href={'https://www.simon.com/mall-insider'}
      />
      <div className="container">
        <FooterSocial />
        <FooterLinks />
        <div className={styles.footerLegal}>
          {
            'COPYRIGHT© 1999-2018, SIMON PROPERTY GROUP, L.P. ALL RIGHTS RESERVED.\nBy using this site, you agree to abide by its Terms of Use, which prohibit commercial use of any information on this site. View our Privacy Policy / Your California Privacy Rights\nSimon values your privacy, manage your Ad Choices'
          }
        </div>
      </div>
    </footer>
  );
};

export default Footer;
