import React from 'react';
import CookieBanner from './CookieBanner';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

describe('<CookieBanner />', () => {
  const wrapper = shallow(<CookieBanner />);
  const mountedWrapper = mount(<CookieBanner />);
  it('renders correctly', () => {
    const tree = renderer.create(<CookieBanner />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render without throwing an error', () => {
    expect(wrapper.find('div.cookieBanner').exists()).toBe(true);
  });

  it('initial state should be false', () => {
    expect(wrapper.state().seen).toBe(false);
  });

  it('sets itself to seen after mounting', () => {
    expect(mountedWrapper.state().seen).toBe(true);
  });

  it('can set a cookie', () => {
    expect(mountedWrapper.instance().setCookie()).toBe(true);
  });
});
