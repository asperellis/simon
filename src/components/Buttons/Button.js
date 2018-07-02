import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.css';

const Button = ({
  className = '',
  children = '',
  theme = '',
  tag = '',
  ...rest
}) => {
  const CustomTag = `${tag}`;
  return (
    <CustomTag
      {...rest}
      className={`${styles.root} ${theme} ${
        tag === 'a' ? 'bold' : ''
      } ${className}`}
    >
      {children}
    </CustomTag>
  );
};

Button.theme = {
  secondary: styles.secondary,
  primary: styles.primary,
  outline: styles.outline,
  outlineSecondary: styles.outlineSecondary
};

Button.defaultProps = {
  theme: Button.theme.primary,
  tag: 'button'
};

Button.displayName = Button.name;

Button.propTypes = {
  theme: PropTypes.string,
  tag: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
};

export default Button;
