import React from 'react';
import styles from './CookieBanner.css';
import { docCookies } from './../../utils/utils';

// Cookie Banner Notificaton
// Shows Cookie message for legal information to users who havent seen it
const CookieBanner = () => {
  // expire date
  const d = new Date();
  // one month in advance
  d.setMonth(d.getMonth() + 13);
  // set the cookie
  docCookies.setItem('seen_cookie_message', true, d);

  return (
    <div
      className={styles.cookieBanner}
      role="complementary"
      aria-label="Simon Cookie Policy"
    >
      {'Simon uses cookies to make the site simpler. '}
      <a href="http://www.simon.com/legal/privacy">
        Find out more about cookies
      </a>
    </div>
  );
};

export default CookieBanner;
