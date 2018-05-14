import React from 'react';
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

const FooterLinks = () => {
  const linkGroups = [
    {
      name: 'Learn More',
      links: [
        { href: 'http://business.simon.com/about', text: 'About Simon' },
        { href: 'http://www.simon.com/mall', text: 'See All Properties' },
        { href: 'https://www.simon.com/travel', text: 'Travel & Tourism' },
        { href: 'http://www.simon.com/brands', text: 'Brands' }
      ]
    },
    {
      name: 'More From Simon',
      links: [
        { href: 'http://www.simon.com/foundatsimon', text: '#foundatsimon' },
        { href: 'https://said.simon.com/', text: 'Simon SAID' },
        { href: 'https://family.simon.com/', text: 'Family at Simon' },
        { href: 'http://syf.org/', text: 'Simon Youth Foundation' }
      ]
    },
    {
      name: 'Simon Giftcards®',
      links: [
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
      ]
    },
    {
      name: 'Business Opportunities',
      links: [
        { href: 'http://business.simon.com/advertising', text: 'Advertising' },
        { href: 'https://business.simon.com/leasing', text: 'Leasing' },
        {
          href: 'http://business.simon.com/property-services',
          text: 'Property Services'
        },
        {
          href: 'http://business.simon.com/retailer-marketing',
          text: 'Retailer Marketing'
        }
      ]
    }
  ];

  return (
    <div className={styles.footerLinks}>
      {linkGroups.map(group => (
        <div className={styles.footerLinksColumn} key={group.name}>
          <div className={[styles.footerLinkHeader, 'bold'].join(' ')}>
            {group.name}
          </div>
          <nav>
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

const Footer = props => {
  return (
    <footer className={styles.footer}>
      <a
        href={props.banner.href}
        className={[styles.footerBannerLink, 'bold'].join(' ')}
      >
        {props.banner.text}
      </a>
      <div className="container">
        <FooterSocialAndSearch />
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
