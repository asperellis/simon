const API = {
  getSearchSuggestions: query => {
    const getSearchUrl = (type, text) => {
      let url = '';
      switch (type.toLowerCase()) {
        case 'mall':
          url = `/mall/${text.replace(/ /g, '-').toLowerCase()}`;
          break;
        case 'tenant':
          url = `/brand/${text.replace(/ /g, '-').toLowerCase()}`;
          break;
        default:
          url = `/search/${encodeURIComponent(
            text.replace(/ /g, '-').toLowerCase()
          )}`;
          break;
      }

      return url;
    };

    return fetch(
      `https://api.simon.com/v1.2/search/GetMainSearchAutoCompleteWithType?q=${query}&max=50&hasWebsiteOnly=false&validPreferredMallsOnly=false&returnType=All&key=40A6F8C3-3678-410D-86A5-BAEE2804C8F2/`
    )
      .then(response => response.json())
      .then(data =>
        data.map(suggestion => {
          return {
            text: suggestion.Item1,
            type: suggestion.Item2,
            href: getSearchUrl(suggestion.Item2, suggestion.Item1)
          };
        })
      );
  }
};

export default API;
