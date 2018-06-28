import React from 'react';
import Meta from './../../meta';
import { Helmet } from 'react-helmet';

const SEO = ({ url = 'default', children, robots = 'index, follow' }) => {
  let content = Meta[url];
  const isOutletDomain = window.location.host.includes('premiumoutlets');
  const mobileAppName = `Simon${isOutletDomain ? ' Premium Outlets' : ''}`;

  if (!content) {
    content = Meta.default;
  }

  return (
    <Helmet>
      <title>{content.title}</title>
      <meta name="description" content={content.description} />
      <meta name="keywords" content={content.keywords} />
      <meta name="robots" content={robots} />
      <meta name="application-name" content={mobileAppName} />
      <meta name="apple-mobile-web-app-title" content={mobileAppName} />
      {isOutletDomain && <meta name="google-site-verification" content="0QU88faOs4nxqlv81Bjqe1T0004AjpONPv6H3uxjw30" />}
      {children}
    </Helmet>
  );
};

export default SEO;
