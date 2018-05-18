import React, { Component } from 'react';
import styles from './Dropdown.css';
import ExpandDown from './../Animations/ExpandDown';

const DropdownContent = ({ children, direction, ...attributes }) => {
  return (
    <div
      className={[styles.dropdownContent, styles[direction]].join(' ')}
      {...attributes}
    >
      {children}
    </div>
  );
};

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      mouseOverButton: false,
      mouseOverMenu: false
    };

    this.buttonTimeout = null;
    this.menuTimeout = null;
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggleDropdown() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }

  enterButton = () => {
    clearTimeout(this.buttonTimeout);
    this.setState({ mouseOverButton: true });
  };

  leaveButton = () => {
    this.buttonTimeout = setTimeout(() => {
      this.setState({ mouseOverButton: false });
    }, 500);
  };

  enterMenu = () => {
    clearTimeout(this.menuTimeout);
    this.setState({ mouseOverMenu: true });
  };

  leaveMenu = () => {
    this.menuTimeout = setTimeout(() => {
      this.setState({ mouseOverMenu: false });
    }, 500);
  };

  render() {
    const open = this.state.mouseOverButton || this.state.mouseOverMenu;
    const {
      text,
      dropOnHover,
      children,
      buttonClassName,
      direction
    } = this.props;
    return (
      <div className={styles.dropdown}>
        <button
          className={[styles.dropdownToggle, buttonClassName].join(' ')}
          onClick={dropOnHover ? undefined : this.toggleDropdown}
          onMouseEnter={dropOnHover ? this.enterButton : undefined}
          onFocus={dropOnHover ? this.enterButton : undefined}
          onBlur={dropOnHover ? this.leaveButton : undefined}
          onMouseLeave={dropOnHover ? this.leaveButton : undefined}
        >
          {text}
        </button>
        <ExpandDown
          in={open || this.state.dropdownOpen}
          duration={300}
          delay={0}
        >
          <DropdownContent
            onMouseEnter={dropOnHover ? this.enterMenu : undefined}
            onMouseLeave={dropOnHover ? this.leaveMenu : undefined}
            onFocus={dropOnHover ? this.enterMenu : undefined}
            onBlur={dropOnHover ? this.leaveMenu : undefined}
            direction={direction}
          >
            {children}
          </DropdownContent>
        </ExpandDown>
      </div>
    );
  }
}

export default Dropdown;
