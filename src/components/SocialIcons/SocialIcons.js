import React from 'react';
import styles from './SocialIcons.css';
import FacebookIcon from './../../images/icons/facebook.svg';
import InstagramIcon from './../../images/icons/instagram.svg';
import LinkedInIcon from './../../images/icons/linkedin.svg';
import TwitterIcon from './../../images/icons/twitter.svg';
import SimonIcon from './../../images/icons/simon.svg';
import YouTubeIcon from './../../images/icons/youtube.svg';

const SocialIcons = props => {
  const icons = {
    facebook: FacebookIcon,
    twitter: TwitterIcon,
    instagram: InstagramIcon,
    linkedin: LinkedInIcon,
    simon: SimonIcon,
    youtube: YouTubeIcon
  };

  return (
    <div className={styles.socialIcons}>
      {Object.keys(props).map(prop => {
        if (!icons[prop]) {
          return false;
        }

        const Icon = icons[prop];
        return (
          <a href={props[prop]} key={prop} className={styles.socialIconLink}>
            <Icon
              width={25}
              height={25}
              viewBox={'0 0 25 25'}
              className={styles.socialIcon}
            />
          </a>
        );
      })}
    </div>
  );
};

export default SocialIcons;
