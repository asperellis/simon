import React from 'react';
import PropTypes from 'prop-types';
import styles from './Loader.css';

// Loader Component
// SVG CSS animated Simon Logo
// Has a prop for a message to give to users while shown
const Loader = ({ message = 'Loading Content...' }) => {
  return (
    <div className={styles.loader}>
      <svg xmlns="http://www.w3.org/2000/svg">
        <path
          className={styles.loaderPath}
          d="M154.85,71.22l37.35,27.16,56.19-40.88L192.19,16.64,79.8,98.38,23.6,57.51,79.8,16.64l37.39,27.19"
        />
      </svg>
      <h1>{message}</h1>
      <p>
        If you are seeing this in demo mode Loading is being manually set to
        simulate a hold while a view is getting the content it needs to fully
        render. Nice huh? Click the button to make this go away.
      </p>
      <button />
    </div>
  );
};

Loader.propTypes = {
  message: PropTypes.string
};

export default Loader;
