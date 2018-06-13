// Themes File
// Config for all sites app level content - things in the headers and footers mostly

// Logos
import SimonLogo from './../images/logos/simon.svg';
import PremiumOutletsLogo from './../images/logos/premium-outlets.svg';
import GiftcardLogo from './../images/logos/giftcard.svg';

// Components
// Importing this here becasue the PO header requires a dropdown for VIP login
import { HeaderNavVipDropdown } from './../components/Header/Header';

// Testing out Classes for building theme parts
// A theme consists of a header and footer that surrounds page content
class Theme {
  constructor(header, footer) {
    this.header = header;
    this.footer = footer;
  }
}

// A Theme header consists of a logo on the left. Links on the right and quick links for search suggestions
class ThemeHeader {
  constructor(logo, links, quickLinks) {
    this.logo = logo;
    this.links = links;
    this.search = {
      quickLinks
    };
  }
}

// A theme footer consists of a banner, links and social networks
class ThemeFooter {
  constructor(banner, links, socialNetworks) {
    this.banner = banner;
    this.links = links;
    this.socialNetworks = socialNetworks;
  }
}

// Basic class for making an object to generate links - text + the url for href
class ThemeLink {
  constructor(text, href) {
    this.text = text;
    this.href = href;
  }
}

// Defautl main links in the header
const HEADER_LINKS = [
  new ThemeLink('SHOPPERS', 'https://www.simon.com'),
  new ThemeLink('BUSINESS', 'https://www.simon.com'),
  new ThemeLink('INVESTORS', 'https://www.simon.com'),
  new ThemeLink('CAREERS', 'https://www.simon.com'),
  new ThemeLink('CONTACT', 'https://www.simon.com')
];

// Default Quick links within search
const HEADER_SEARCH_QUICK_LINKS = [
  new ThemeLink('See All Properties', 'https://www.simon.com/mall'),
  new ThemeLink('Mall Insider', 'https://www.simon.com/mall-insider'),
  new ThemeLink('VIP Club', 'https://www.premiumoutlets.com/vip'),
  new ThemeLink('Brands', 'http://www.simon.com/brands'),
  new ThemeLink('Simon Giftcard®', 'https://www.simon.com/giftcard'),
  new ThemeLink('Travel & Tourism', 'https://www.simon.com/travel')
];

// Default Links in the Footer
const FOOTER_LINKS = [
  {
    name: 'Learn More',
    links: [
      new ThemeLink('About Simon', 'http://business.simon.com/about'),
      new ThemeLink('See All Properties', 'http://www.simon.com/mall'),
      new ThemeLink('Travel & Tourism', 'https://www.simon.com/travel'),
      new ThemeLink('Brands', 'http://www.simon.com/brands')
    ]
  },
  {
    name: 'More From Simon',
    links: [
      new ThemeLink('#foundatsimon', 'http://www.simon.com/foundatsimon'),
      new ThemeLink('Simon SAID', 'https://said.simon.com/'),
      new ThemeLink('Family at Simon', 'https://family.simon.com/'),
      new ThemeLink('Simon Youth Foundation', 'http://syf.org/')
    ]
  },
  {
    name: 'Simon Giftcards®',
    links: [
      new ThemeLink('Purchase a Giftcard', 'https://www.simon.com/giftcard/'),
      new ThemeLink(
        'Register Your Card',
        'https://www.simon.com/giftcard/account_register.aspx'
      ),
      new ThemeLink(
        'Check Your Balance',
        'https://www.simon.com/giftcard/card_balance.aspx'
      ),
      new ThemeLink('Corporate Sales', 'https://www.simon.com/volume/')
    ]
  },
  {
    name: 'Business Opportunities',
    links: [
      new ThemeLink('http://business.simon.com/advertising', 'Advertising'),
      new ThemeLink('https://business.simon.com/leasing', 'Leasing'),
      new ThemeLink(
        'Property Services',
        'http://business.simon.com/property-services'
      ),
      new ThemeLink(
        'Retailer Marketing',
        'http://business.simon.com/retailer-marketing'
      )
    ]
  }
];

// Default Social Links
export const SIMON_SOCIAL_NETWORKS = {
  facebook: 'https://www.facebook.com',
  twitter: 'https://www.twitter.com',
  youtube: 'https://www.youtube.com',
  simon: 'https://www.simon.com',
  instagram: 'https://www.instagram.com'
};

// Defining Site Footers as needed
// Would like to base them off the SIMON ones but need to figure this out
const SIMON_FOOTER = new ThemeFooter(
  new ThemeLink(
    'BECOME A MALL INSIDER. JOIN TODAY',
    'https://www.simon.com/mall-insider'
  ),
  FOOTER_LINKS,
  SIMON_SOCIAL_NETWORKS
);
const SIMON_HEADER = new ThemeHeader(
  SimonLogo,
  HEADER_LINKS,
  HEADER_SEARCH_QUICK_LINKS
);

const PREMIUM_OUTLETS_HEADER = new ThemeHeader(
  PremiumOutletsLogo,
  [...HEADER_LINKS, HeaderNavVipDropdown],
  [
    ...HEADER_SEARCH_QUICK_LINKS.slice(0, 4),
    {
      href: 'http://www.simon.com/brands',
      text: 'PO Specific Quick Link'
    }
  ]
);
const PREMIUM_OUTLETS_FOOTER = new ThemeFooter(
  new ThemeLink(
    'JOIN THE VIP CLUB TODAY',
    'https://www.premiumoutlets.com/vip/register'
  ),
  [
    ...FOOTER_LINKS.filter(group => group.name !== 'Business Opportunities'),
    {
      name: 'Premium Outlets International',
      links: [
        new ThemeLink('Deutsch', 'http://www.premiumoutlets.com/german/'),
        new ThemeLink('Español', 'http://www.premiumoutlets.com/spanish/'),
        new ThemeLink('Français', 'http://www.premiumoutlets.com/french/'),
        new ThemeLink('Portugués', 'http://www.premiumoutlets.com/portuguese/'),
        new ThemeLink('中文', 'http://www.premiumoutlets.com/chinese/'),
        new ThemeLink('한국어', 'http://www.premiumoutlets.com/korean/'),
        new ThemeLink('日本語', 'http://www.premiumoutlets.com/japanese/')
      ],
      wrap: true
    }
  ],
  SIMON_SOCIAL_NETWORKS
);

const GIFTCARD_HEADER = new ThemeHeader(
  GiftcardLogo,
  HEADER_LINKS,
  HEADER_SEARCH_QUICK_LINKS
);
const GIFTCARD_FOOTER = new ThemeFooter(
  new ThemeLink(
    'CHECK YOUR CARD BALANCE',
    'https://www.simon.com/giftcard/card_balance.aspx'
  ),
  FOOTER_LINKS,
  SIMON_SOCIAL_NETWORKS
);

// Export themes for use
export const THEMES = {
  simon: new Theme(SIMON_HEADER, SIMON_FOOTER),
  premiumOutlets: new Theme(PREMIUM_OUTLETS_HEADER, PREMIUM_OUTLETS_FOOTER),
  giftcard: new Theme(GIFTCARD_HEADER, GIFTCARD_FOOTER)
};
