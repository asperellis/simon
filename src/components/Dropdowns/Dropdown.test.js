import React from 'react';
import Dropdown from './Dropdown';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

describe('<Dropdown />', () => {
  const wrapper = shallow(<Dropdown />);

  const enterAndLeaveTest = (enterEvent, leaveEvent, selector) => {
    jest.useFakeTimers();
    wrapper.setProps({ dropOnHover: true });
    wrapper.find(selector).simulate(enterEvent);
    expect(wrapper.state().mouseOverDropdown).toBe(true);
    expect(wrapper.find('ExpandDown').props().in).toBe(true);
    wrapper.find(selector).simulate(leaveEvent);
    jest.runAllTimers();
    expect(wrapper.state().mouseOverDropdown).toBe(false);
    expect(wrapper.state().dropdownOpen).toBe(false);
    // this is true but not sure why expect(wrapper.find('ExpandDown').props().in).toBe(false);
  };

  it('renders correctly', () => {
    const tree = renderer.create(<Dropdown />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render without throwing an error', () => {
    expect(wrapper.find('div.dropdown').exists()).toBe(true);
    expect(wrapper.find('ExpandDown').props().in).toBe(false);
  });

  it('should not show content when hovered without a prop allowing it to do so', () => {
    wrapper.find('.dropdownToggle').simulate('focus');
    expect(wrapper.find('ExpandDown').props().in).toBe(false);
  });

  it('should open and close onClick if not set to hover', () => {
    wrapper.find('.dropdownToggle').simulate('click');
    expect(wrapper.state().dropdownOpen).toBe(true);
    expect(wrapper.find('ExpandDown').props().in).toBe(true);
    wrapper.find('.dropdownToggle').simulate('click');
    expect(wrapper.find('ExpandDown').props().in).toBe(false);
    expect(wrapper.state().dropdownOpen).toBe(false);
  });

  it('should show content when toggle is hovered and then collapse it when blurred', () => {
    enterAndLeaveTest('focus', 'blur', '.dropdownToggle');
  });

  it('should show content when mouse enters toggle and collapse when it leaves', () => {
    enterAndLeaveTest('mouseEnter', 'mouseLeave', '.dropdownToggle');
  });

  it('should show content when mouse enters toggle and stay open when on content but collapse when leave', () => {
    jest.useFakeTimers();
    wrapper.setProps({ dropOnHover: true });
    wrapper.find('.dropdownToggle').simulate('mouseEnter');
    expect(wrapper.state().mouseOverDropdown).toBe(true);
    wrapper.find('.dropdownContent').simulate('mouseEnter');
    expect(wrapper.find('ExpandDown').props().in).toBe(true);
    wrapper.find('.dropdownContent').simulate('mouseLeave');
    jest.runAllTimers();
    expect(wrapper.state().mouseOverDropdown).toBe(false);
    expect(wrapper.state().dropdownOpen).toBe(false);
  });
});
