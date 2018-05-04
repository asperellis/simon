import React from 'react';
import styles from './Loader.css';

function Loader(props) {
  return (
    <div className={styles.loader}>
      <svg xmlns="http://www.w3.org/2000/svg">
        <path
          className={styles.loaderPath}
          d="M154.85,71.22l37.35,27.16,56.19-40.88L192.19,16.64,79.8,98.38,23.6,57.51,79.8,16.64l37.39,27.19"
        />
      </svg>
      <h1>{props.children || 'Loading Content...'}</h1>
    </div>
  );
}

export default Loader;
