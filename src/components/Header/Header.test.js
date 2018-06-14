import React from 'react';
import Header from './Header';
import { THEMES } from './../../layouts/Themes';
import { shallow } from 'enzyme';
import { StaticRouter } from 'react-router';
import renderer from 'react-test-renderer';

describe('<Header />', () => {
  let props;
  let mountedHeader;
  const header = () => {
    if (!mountedHeader) {
      mountedHeader = shallow(<Header {...props} />);
    }
    return mountedHeader;
  };

  beforeEach(() => {
    props = {
      theme: THEMES.simon.header,
      searchSettings: { include: true, toggle: true },
      adminLoggedIn: false,
      userLocation: {},
      getUserLocation: undefined
    };
    mountedHeader = undefined;
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <StaticRouter context={{}}>
          <Header {...props} />
        </StaticRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render without throwing an error', () => {
    expect(
      header()
        .find('header.header')
        .exists()
    ).toBe(true);
  });
});
