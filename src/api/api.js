// API Utility
const API = {
  // header search autocomplete method
  // takes in a partial query and returns search suggestions
  getSearchSuggestions: query => {
    // based on the type of result you can route to different locations
    const getSearchUrl = (type, text) => {
      let url = '';
      // based on the type of suggestion - mall, tenant or other
      switch (type.toLowerCase()) {
        // go to the mall page
        case 'mall':
          url = `/mall/${text.replace(/ /g, '-').toLowerCase()}`;
          break;
        // go to the brand page - similar to search results but only properties that show the brand
        case 'tenant':
          url = `/brand/${text.replace(/ /g, '-').toLowerCase()}`;
          break;
        // no matches so show search results
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
          // mapping to have better property names and routes included
          // this should be on the api but temp here
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
