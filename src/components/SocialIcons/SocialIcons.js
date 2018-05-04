import React from 'react';
import PropTypes from 'prop-types';
import styles from './SocialIcons.css';
import FacebookIcon from './../../images/icons/facebook.svg';
import InstagramIcon from './../../images/icons/instagram.svg';
import LinkedInIcon from './../../images/icons/linkedin.svg';
import TwitterIcon from './../../images/icons/twitter.svg';
import SimonIcon from './../../images/icons/simon.svg';
import YouTubeIcon from './../../images/icons/youtube.svg';
import EmailIcon from './../../images/icons/email.svg';

const SocialIcons = ({
  width = 25,
  height = 25,
  fill = '#000',
  className,
  ...networks
}) => {
  const icons = {
    facebook: FacebookIcon,
    twitter: TwitterIcon,
    instagram: InstagramIcon,
    linkedin: LinkedInIcon,
    simon: SimonIcon,
    youtube: YouTubeIcon,
    email: EmailIcon
  };

  return (
    <div className={[styles.socialIcons, className].join(' ')}>
      {Object.keys(networks).map(network => {
        if (!icons[network]) {
          return false;
        }

        const Icon = icons[network];
        return (
          <a
            href={networks[network]}
            key={network}
            className={styles.socialIconLink}
          >
            <Icon
              width={width}
              height={height}
              fill={fill}
              viewBox={'0 0 ' + width + ' ' + height}
              className={styles.socialIcon}
            />
          </a>
        );
      })}
    </div>
  );
};

SocialIcons.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  fill: PropTypes.string,
  facebook: PropTypes.string,
  twitter: PropTypes.string,
  instagram: PropTypes.string,
  linkedin: PropTypes.string,
  email: PropTypes.string,
  simon: PropTypes.string,
  youtube: PropTypes.string
};

export default SocialIcons;
