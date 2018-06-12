import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './SocialIcons.css';
import FacebookIcon from './../../images/icons/facebook.svg';
import InstagramIcon from './../../images/icons/instagram.svg';
import LinkedInIcon from './../../images/icons/linkedin.svg';
import TwitterIcon from './../../images/icons/twitter.svg';
import SimonIcon from './../../images/icons/simon.svg';
import YouTubeIcon from './../../images/icons/youtube.svg';
import EmailIcon from './../../images/icons/email.svg';

// Social Icons Component
// Takes in a set of props in the format networkname=url along with size and fill for the icons
// Currently only supports displaying in a horizontal format
const SocialIcons = ({
  width = 25,
  height = 25,
  fill = '#000',
  ...networks
}) => {
  // manual map to all icons. not sure this is the best way but it works
  const icons = {
    facebook: FacebookIcon,
    twitter: TwitterIcon,
    instagram: InstagramIcon,
    linkedin: LinkedInIcon,
    simon: SimonIcon,
    youtube: YouTubeIcon,
    email: EmailIcon
  };

  // for each network passed as a prop if theres a matching icon
  // output a link to that networks url wrapped around the icon
  return (
    <div className={styles.socialIcons}>
      {Object.keys(networks).map(networkName => {
        if (!icons[networkName]) {
          return false;
        }

        const Icon = icons[networkName];
        const networkUrl = networks[networkName];

        return (
          <Link
            to={networkUrl}
            key={networkName}
            aria-label={networkName}
            className={styles.socialIconLink}
          >
            <Icon
              width={width}
              height={height}
              fill={fill}
              viewBox={'0 0 ' + width + ' ' + height}
              className={styles.socialIcon}
            />
          </Link>
        );
      })}
    </div>
  );
};

SocialIcons.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
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
