import React from 'react';
import Search from './Search';
import { mount } from 'enzyme';
import { StaticRouter } from 'react-router';
import renderer from 'react-test-renderer';

describe('<Search />', () => {
  let props;
  let mountedSearch;
  const search = () => {
    if (!mountedSearch) {
      mountedSearch = mount(
        <StaticRouter context={{}}>
          <Search {...props} />
        </StaticRouter>
      );
    }
    return mountedSearch;
  };

  beforeEach(() => {
    props = {
      canToggle: true,
      quickLinks: [],
      toggleSearch: undefined,
      userLocation: {},
      getUserLocation: undefined
    };
    mountedSearch = undefined;
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <StaticRouter context={{}}>
          <Search {...props} />
        </StaticRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render without throwing an error', () => {
    expect(
      search()
        .find('.headerSearch')
        .exists()
    ).toBe(true);
  });
});
