import React from 'react';
import styles from './CookieMessage.css';
import { docCookies } from './../../utils/utils';

const CookieMessage = () => {
  // expire date
  const d = new Date();
  // one month in advance
  d.setMonth(d.getMonth() + 1);
  // set the cookie
  docCookies.setItem('seen_cookie_message', true, d);
  return (
    <div
      className={styles.cookieMessage}
      role="complementary"
      aria-label="Simon Cookie Policy"
    >
      <p>
        {'Simon uses cookies to make the site simpler. '}
        <a href="http://www.simon.com/legal/privacy">
          Find out more about cookies
        </a>
      </p>
    </div>
  );
};

export default CookieMessage;
