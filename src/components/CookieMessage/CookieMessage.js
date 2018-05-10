import React from 'react';
import styles from './CookieMessage.css';

const CookieMessage = () => {
  // check for the cookie
  const seenCookieMessage =
    document.cookie
      .split(';')
      .filter(item => item.includes('seen_cookie_message=')).length > 0;

  if (!seenCookieMessage) {
    // save a seen cookie cookie
    const d = new Date();
    // one month in advance
    d.setMonth(d.getMonth() + 1);
    // set the cookie
    document.cookie = 'seen_cookie_message=true; expires=' + d.toUTCString();
  }

  return (
    <div
      className={styles.cookieMessage}
      style={seenCookieMessage ? {} : { display: 'block' }}
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
