import React from 'react';
import Footer from './Footer';
import { THEMES } from './../../layouts/Themes';
import { shallow } from 'enzyme';
import { StaticRouter } from 'react-router';
import renderer from 'react-test-renderer';

describe('<Footer />', () => {
  let props;
  let mountedFooter;
  const footer = () => {
    if (!mountedFooter) {
      mountedFooter = shallow(<Footer {...props} />);
    }
    return mountedFooter;
  };

  beforeEach(() => {
    props = {
      theme: THEMES.simon.footer
    };
    mountedFooter = undefined;
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <StaticRouter context={{}}>
          <Footer {...props} />
        </StaticRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render without throwing an error', () => {
    expect(
      footer()
        .find('footer.footer')
        .exists()
    ).toBe(true);
  });

  it('should render a banner', () => {
    expect(footer().find('FooterBanner').length).toBe(1);
  });

  it('should render legal copy', () => {
    expect(footer().find('FooterLegal').length).toBe(1);
  });
});
