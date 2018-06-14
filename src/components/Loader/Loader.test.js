import React from 'react';
import Loader from './Loader';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

describe('<Loader />', () => {
  const LOADER_MESSAGE = 'Test Loader';
  const wrapper = shallow(<Loader message={LOADER_MESSAGE} />);

  it('renders correctly', () => {
    const tree = renderer.create(<Loader message={LOADER_MESSAGE} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render without throwing an error', () => {
    expect(wrapper.find('div.loader').exists()).toBe(true);
  });

  it('should have message text', () => {
    expect(wrapper.find('h1').text()).toBeTruthy();
  });
});
