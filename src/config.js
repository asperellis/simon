export const config = {
  localhost: {
    theme: 'simon',
    apiUrl: 'https://api.localhost.com',
    webUrl: 'http://localhost',
    outletsUrl: 'http://premiumoutlets.localhost.com',
    secureOutletsUrl: 'https://premiumoutlets.localhost.com',
    secureWebUrl: 'https://localhost',
    brandsUrl: 'http://brands.localhost.com',
    businessUrl: 'http://business.localhost.com',
    careersUrl: 'http://careers.localhost.com',
    familyUrl: 'http://family.localhost.com',
    vipUrl: 'https://premiumoutlets.localhost.com/vip'
  },
  'premiumoutlets.localhost.com': {
    theme: 'premiumOutlets',
    apiUrl: 'https://api.localhost.com',
    webUrl: 'http://localhost',
    outletsUrl: 'http://premiumoutlets.localhost.com',
    secureOutletsUrl: 'https://premiumoutlets.localhost.com',
    secureWebUrl: 'https://localhost',
    brandsUrl: 'http://brands.localhost.com',
    businessUrl: 'http://business.localhost.com',
    careersUrl: 'http://careers.localhost.com',
    familyUrl: 'http://family.localhost.com',
    vipUrl: 'https://premiumoutlets.localhost.com/vip'
  },
  'dev.simon-ops.com': {},
  'test.simon-ops.com': {},
  'stage.simon-ops.com': {},
  'simon.com': {
    apiUrl: ''
  },
  // for testing a prod build
  'asperellis.github.io': {
    theme: 'simon',
    apiUrl: 'https://api.simon.com/v1.2',
    webUrl: 'http://www.simon.com',
    outletsUrl: 'http://premiumoutlets.com',
    secureOutletsUrl: 'https://premiumoutlets.com',
    secureWebUrl: 'https://www.simon.com',
    brandsUrl: 'http://brands.simon.com',
    businessUrl: 'http://business.simon.com',
    careersUrl: 'http://careers.simon.com',
    familyUrl: 'http://family.simon.com',
    vipUrl: 'https://premiumoutlets.simon.com/vip'
  }
}[window.location.hostname];
