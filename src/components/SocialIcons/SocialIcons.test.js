import React from 'react';
import SocialIcons from './SocialIcons';
import { SIMON_SOCIAL_NETWORKS } from './../../layouts/Themes';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router';

describe('<SocialIcons />', () => {
  const ICON_SIZE = 25;
  const wrapper = shallow(
    <SocialIcons
      width={ICON_SIZE}
      height={ICON_SIZE}
      {...SIMON_SOCIAL_NETWORKS}
    />
  );
  const testNetworks = Object.keys(SIMON_SOCIAL_NETWORKS);
  const networkLinks = wrapper.find('Link');

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <StaticRouter>
          <SocialIcons
            width={ICON_SIZE}
            height={ICON_SIZE}
            {...SIMON_SOCIAL_NETWORKS}
          />
        </StaticRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render without throwing an error', () => {
    expect(wrapper.find('div').exists()).toBe(true);
  });

  it('should render icons with wrapped with Link for each network passed in as a prop', () => {
    expect(networkLinks.length).toEqual(testNetworks.length);
  });

  it('should give each link an href matching its network', () => {
    networkLinks.forEach((link, index) => {
      expect(link.props().to).toEqual(
        SIMON_SOCIAL_NETWORKS[testNetworks[index]]
      );
    });
  });

  it('should give each link an svg child matching its network', () => {
    networkLinks.forEach((link, index) => {
      const icon = link.children().first();
      expect(icon.name()).toEqual(`${testNetworks[index]}.svg`);
    });
  });

  it('should give each icon the same width and height from props', () => {
    networkLinks.forEach(link => {
      const icon = link.children().first();
      const iconHeight = icon.props().height;
      const iconWidth = icon.props().width;
      expect(iconHeight * iconWidth).toEqual(ICON_SIZE * ICON_SIZE);
    });
  });
});
