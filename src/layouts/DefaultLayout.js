import React, { Component } from 'react';
import styles from './DefaultLayout.css';
import {
  default as Header,
  HeaderNavVipDropdown
} from './../components/Header/Header';
import Footer from './../components/Footer/Footer';
import SimonLogo from './../images/logos/simon.svg';
import PremiumOutletsLogo from './../images/logos/premium-outlets.svg';
import GiftcardLogo from './../images/logos/giftcard.svg';
import CookieMessage from './../components/CookieMessage/CookieMessage';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { docCookies } from './../utils/utils';

// links in the header - default
const HEADER_LINKS = [
  { text: 'SHOPPERS', href: 'https://www.simon.com' },
  { text: 'BUSINESS', href: 'https://www.simon.com' },
  { text: 'INVESTORS', href: 'https://www.simon.com' },
  { text: 'CAREERS', href: 'https://www.simon.com' },
  { text: 'CONTACT', href: 'https://www.simon.com' }
];

const HEADER_SEARCH_QUICK_LINKS = [
  {
    href: 'https://www.simon.com/mall',
    text: 'See All Properties'
  },
  {
    href: 'https://www.simon.com/mall-insider',
    text: 'Mall Insider'
  },
  {
    href: 'https://www.premiumoutlets.com/vip',
    text: 'VIP Club'
  },
  {
    href: 'http://www.simon.com/brands',
    text: 'Brands'
  },
  {
    href: 'https://www.simon.com/giftcard',
    text: 'Simon Giftcard®'
  },
  {
    href: 'https://www.simon.com/travel',
    text: 'Travel & Tourism'
  }
];

const FOOTER_LINKS = [
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

const THEMES = {
  simon: {
    header: {
      links: HEADER_LINKS,
      logo: SimonLogo,
      search: {
        quickLinks: HEADER_SEARCH_QUICK_LINKS
        // could also add autocomplete url here
      }
    },
    footer: {
      banner: {
        text: 'BECOME A MALL INSIDER. JOIN TODAY',
        href: 'https://www.simon.com/mall-insider'
      },
      links: FOOTER_LINKS
    }
  },
  premiumOutlets: {
    header: {
      links: [...HEADER_LINKS, HeaderNavVipDropdown],
      logo: PremiumOutletsLogo,
      search: {
        quickLinks: [
          ...HEADER_SEARCH_QUICK_LINKS.slice(0, 4),
          {
            href: 'http://www.simon.com/brands',
            text: 'PO Specific Quick Link'
          }
        ]
        // could also add autocomplete url here
      }
    },
    footer: {
      banner: {
        text: 'JOIN THE VIP CLUB TODAY',
        href: 'https://www.premiumoutlets.com/vip/register'
      },
      links: [
        ...FOOTER_LINKS.filter(
          group => group.name !== 'Business Opportunities'
        ),
        {
          name: 'Premium Outlets International',
          links: [
            {
              href: 'http://www.premiumoutlets.com/german/',
              text: 'Deutsch'
            },
            {
              href: 'http://www.premiumoutlets.com/spanish/',
              text: 'Español'
            },
            {
              href: 'http://www.premiumoutlets.com/french/',
              text: 'Français'
            },
            {
              href: 'http://www.premiumoutlets.com/portuguese/',
              text: 'Portugués'
            },
            {
              href: 'http://www.premiumoutlets.com/chinese/',
              text: '中文'
            },
            {
              href: 'http://www.premiumoutlets.com/korean/',
              text: '한국어'
            },
            {
              href: 'http://www.premiumoutlets.com/japanese/',
              text: '日本語'
            }
          ],
          wrap: true
        }
      ]
    }
  },
  giftcard: {
    header: {
      links: HEADER_LINKS,
      logo: GiftcardLogo,
      search: {
        quickLinks: HEADER_SEARCH_QUICK_LINKS
        // could also add autocomplete url here
      }
    },
    footer: {
      banner: {
        text: 'CHECK YOUR CARD BALANCE',
        href: 'https://www.simon.com/giftcard/card_balance.aspx'
      },
      links: FOOTER_LINKS
    }
  }
};

const mapStateToProps = state => {
  return {
    user: state.user,
    search: state.search
  };
};

class DefaultLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: 'simon'
    };
  }

  render() {
    const theme = THEMES[this.state.theme];
    const { user, search } = this.props;
    const contentPad = 1 + (user.status === 'LOGGED_IN') + !search.toggle;
    const hasSeenCookieMessage = docCookies.getItem('seen_cookie_message');
    const mainClass = styles[`contentPad${contentPad}`];

    return (
      <div>
        {theme ? (
          <div>
            <Header theme={theme.header} />
            {!hasSeenCookieMessage && <CookieMessage />}
            <main className={mainClass} id="site-content" tabIndex="-1">
              {this.props.children}
            </main>
            <Footer theme={theme.footer} />
          </div>
        ) : (
          this.props.children
        )}
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(DefaultLayout));
