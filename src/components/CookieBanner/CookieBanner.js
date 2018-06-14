import React, { PureComponent } from 'react';
import styles from './CookieBanner.css';
import { docCookies } from './../../utils/docCookies';

// Cookie Banner Notificaton
// Shows Cookie message for legal information to users who havent seen it
class CookieBanner extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      seen: docCookies.getItem('seen_cookie_message') ? true : false
    };
  }

  componentDidMount() {
    // set a cookie if the user hasnt seen this before
    if (!this.state.seen) {
      this.setCookie();
    }
  }

  setCookie() {
    const expireDate = new Date();
    // one month in advance
    expireDate.setMonth(expireDate.getMonth() + 13);
    // set the cookie
    docCookies.setItem('seen_cookie_message', true, expireDate);

    return docCookies.hasItem('seen_cookie_message');
  }

  render() {
    const { seen } = this.state;
    return (
      <div
        className={`${styles.cookieBanner} ${!seen ? styles.show : ''}`}
        role="complementary"
        aria-label="Simon Cookie Policy"
      >
        {'Simon uses cookies to make the site simpler. '}
        <a href="http://www.simon.com/legal/privacy">
          Find out more about cookies
        </a>
      </div>
    );
  }
}

export default CookieBanner;
