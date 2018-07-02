import React, { PureComponent } from 'react';
import styles from './Dropdown.css';
import CSSTransition from './../Animations/CSSTransition';
import Button from './../Buttons/Button';
import PropTypes from 'prop-types';

// Dropdown Toggle Component.
// This is the toggle to open/close dropdown content based on diff user events
// Using an a tag if there is something to link with a hover dropdown and a button otherwise
const DropdownToggle = ({
  text = 'EXPAND DOWN',
  href = '',
  className = '',
  dropOnHover = false,
  overwriteEvents = undefined,
  toggleDropdown = undefined,
  ...trackedEvents
}) => {
  let onClick = dropOnHover ? undefined : toggleDropdown;
  const isLink = href && dropOnHover;
  if (isLink) {
    onClick = overwriteEvents;
  }

  return (
    <Button
      tag={isLink ? 'a' : 'button'}
      href={href || undefined}
      className={className}
      onClick={onClick}
      {...trackedEvents}
    >
      {text}
    </Button>
  );
};

DropdownToggle.propTypes = {
  text: PropTypes.string,
  toggleClasses: PropTypes.string,
  dropOnHover: PropTypes.bool,
  overwriteEvents: PropTypes.func,
  href: PropTypes.string,
  toggleDropdown: PropTypes.func
};

const DropdownContent = ({
  style = {},
  direction = 'left',
  content = undefined,
  status = '',
  ...trackedEvents
}) => {
  return (
    <div
      className={`${styles.dropdownContent} ${styles[direction]}`}
      {...trackedEvents}
      style={style}
    >
      <CSSTransition
        in={status === 'entered'}
        duration={300}
        delay={300}
        cssProps={[['opacity', 0, 1]]}
      >
        {content}
      </CSSTransition>
    </div>
  );
};

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
    this.overwriteEvents = this.overwriteEvents.bind(this);
  }

  static defaultProps = {
    text: 'EXPAND',
    toggleClasses: '',
    dropOnHover: false,
    direction: 'left',
    href: ''
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

  overwriteEvents = () => {
    this.setState({ mouseOverDropdown: false });
  };

  render() {
    const {
      text,
      dropOnHover,
      children,
      toggleClasses,
      direction,
      href
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
        <DropdownToggle
          href={href}
          className={`${styles.dropdownToggle} ${toggleClasses}`}
          text={text}
          dropOnHover={dropOnHover}
          overwriteEvents={this.overwriteEvents}
          toggleDropdown={this.toggleDropdown}
          {...trackedEvents}
        />
        <CSSTransition
          in={isOpen}
          duration={300}
          delay={0}
          cssProps={[
            ['opacity', 0, 1],
            ['transform', 'scaleY(0)', 'scaleY(1)'],
            ['transformOrigin', 'center top', 'center top']
          ]}
        >
          <DropdownContent
            content={children}
            direction={direction}
            {...trackedEvents}
          />
        </CSSTransition>
      </div>
    );
  }
}

Dropdown.propTypes = {
  text: PropTypes.string.isRequired,
  toggleClasses: PropTypes.string,
  dropOnHover: PropTypes.bool,
  direction: PropTypes.string,
  href: PropTypes.string
};

export default Dropdown;
