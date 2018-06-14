import React, { PureComponent } from 'react';
import styles from './Dropdown.css';
import ExpandDown from './../Animations/ExpandDown';
import PropTypes from 'prop-types';

// Dropdown Component. Wrap any elements or components
// Produces a button with supplied text and hides all children in a dropdown wrapper
// Expands on click or hover of the button based on props
class Dropdown extends PureComponent {
  constructor(props) {
    super(props);

    // if the dropdown isnt open and the mouse isnt over the button or the contents then close the dropdown
    this.state = {
      dropdownOpen: false,
      mouseOverDropdown: false
    };

    // so we can clear timeouts
    this.exitDropdownTimer = null;

    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  static defaultProps = {
    text: 'EXPAND',
    buttonClasses: '',
    dropOnHover: false,
    direction: 'left'
  };

  // click event of the button
  toggleDropdown() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  // the mouse is over the dropdown contents so it shouldnt close
  enterDropdown = () => {
    clearTimeout(this.exitDropdownTimer);
    this.setState({ mouseOverDropdown: true });
  };

  // the mouse is not over the dropdown content
  leaveDropdown = () => {
    this.exitDropdownTimer = setTimeout(() => {
      this.setState({ mouseOverDropdown: false });
    }, 500);
  };

  render() {
    const {
      text,
      dropOnHover,
      children,
      buttonClasses,
      direction
    } = this.props;

    // dropdown is open if the mouse/focus is on the button or the dropdown contents or if the user has clicked the button to open it
    const isOpen = this.state.mouseOverDropdown || this.state.dropdownOpen;

    // events that update the state of the dropdown being open or closed
    const trackedEvents = dropOnHover
      ? {
        onMouseEnter: this.enterDropdown,
        onMouseLeave: this.leaveDropdown,
        onFocus: this.enterDropdown,
        onBlur: this.leaveDropdown
      }
      : {};

    return (
      <div className={styles.dropdown}>
        <button
          className={`${styles.dropdownToggle} ${buttonClasses}`}
          onClick={dropOnHover ? undefined : this.toggleDropdown}
          {...trackedEvents}
        >
          {text}
        </button>
        <ExpandDown in={isOpen}>
          <div
            className={`${styles.dropdownContent} ${styles[direction]}`}
            {...trackedEvents}
          >
            {children}
          </div>
        </ExpandDown>
      </div>
    );
  }
}

Dropdown.propTypes = {
  text: PropTypes.string.isRequired,
  buttonClasses: PropTypes.string,
  dropOnHover: PropTypes.bool,
  direction: PropTypes.string
};

export default Dropdown;
