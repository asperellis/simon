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
      mouseOverButton: false,
      mouseOverContent: false
    };

    // so we can clear timeouts
    this.buttonTimeout = null;
    this.menuTimeout = null;

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

  // the mouse is over the button
  enterButton = () => {
    clearTimeout(this.buttonTimeout);
    this.setState({ mouseOverButton: true });
  };

  // the mouse has left the button
  leaveButton = () => {
    this.buttonTimeout = setTimeout(() => {
      this.setState({ mouseOverButton: false });
    }, 500);
  };

  // the mouse is over the dropdown contents so it shouldnt close
  enterMenu = () => {
    clearTimeout(this.menuTimeout);
    this.setState({ mouseOverContent: true });
  };

  // the mouse is not over the dropdown content
  leaveMenu = () => {
    this.menuTimeout = setTimeout(() => {
      this.setState({ mouseOverContent: false });
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
    const isOpen =
      this.state.mouseOverButton ||
      this.state.mouseOverContent ||
      this.state.dropdownOpen;

    // events that update the state of the dropdown being open or closed
    const trackedEvents = {
      onMouseEnter: dropOnHover ? this.enterMenu : undefined,
      onMouseLeave: dropOnHover ? this.leaveMenu : undefined,
      onFocus: dropOnHover ? this.enterMenu : undefined,
      onBlur: dropOnHover ? this.leaveMenu : undefined
    };

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
