import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { ask } from 'what-input';
import { debounce } from './../../utils/utils';
import PropTypes from 'prop-types';
import API from './../../api/api';
import SearchIcon from './../../images/icons/search.svg';
import NavIcon from './../../images/icons/nav.svg';
import FadeInRight from './../Animations/FadeInRight';
import ExpandDown from './../Animations/ExpandDown';
import styles from './Search.css';

/*
  HeaderSearchForm Component
  Form with search input and button to perform global searches across the site

  Props
  performSearch: the searching method to search attached to the submit of the form
  updateQuery: updates the parents query state
  query: the current parents search query set to the value of the input
  handleKeyDown: keydown method for the search input watching for up, down to move autocomplete cursor state or enter key for searching
  showSuggestions: method that takes a boolean value to show search suggestions or not
  autoFocus: boolean determining autoFocus prop of the input
  inputRef: ref for parent component
  style: object from animation component
*/
const HeaderSearchForm = ({
  performSearch = undefined,
  updateQuery = undefined,
  query = '',
  handleKeyDown = undefined,
  showSuggestions = undefined,
  autoFocus = false,
  inputRef = undefined,
  style = {}
}) => {
  return (
    <form
      role="search"
      onSubmit={performSearch}
      className={styles.headerSearchForm}
      style={style}
    >
      <button
        type="submit"
        aria-label="Search"
        className={styles.headerSearchBtn}
      >
        <SearchIcon
          width={23}
          height={23}
          fill={'#fff'}
          viewBox={'0 0 23 23'}
          className={styles.headerSearchIcon}
        />
      </button>
      {!query && (
        <label htmlFor="headerSearchInput" className={styles.headerSearchLabel}>
          {'Search by center, store or location'}
        </label>
      )}
      <input
        type="search"
        name="headerSearchInput"
        id="headerSearchInput"
        autoFocus={autoFocus}
        className={styles.headerSearchInput}
        value={query}
        ref={inputRef}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          showSuggestions(true);
        }}
        onBlur={() => {
          showSuggestions(query.length > 0);
        }}
        onChange={updateQuery}
        aria-label="Search by center, store or location"
        autoComplete="off"
      />
    </form>
  );
};

HeaderSearchForm.propTypes = {
  performSearch: PropTypes.func,
  updateQuery: PropTypes.func,
  query: PropTypes.string,
  handleKeyDown: PropTypes.func,
  showSuggestions: PropTypes.func,
  autoFocus: PropTypes.bool,
  inputRef: PropTypes.object
};

/*
  HeaderSearchSuggestions Component
  Shows quick links or autocomplete suggestions based on the query state of parent component

  Props
  suggestions: array of autocomplete suggestions from parent component
  showSuggestions: method to set whether or not to show suggestions based on passing a bool param
  cursor: index of the suggestions array user is on based on keyboard navigation
  quickLinks: array from theme of links to show when there are no autocomplete suggestions
  status: string from ExpandDown Animation component of that animations status
  style: object of styles from ExpandDown Animation component
*/
const HeaderSearchSuggestions = ({
  suggestions = null,
  showSuggestions = undefined,
  cursor = 0,
  quickLinks = null,
  status = '',
  style = {}
}) => {
  // if we have autocomplete suggestions use them, else use quick links from the theme and if neither do nothing
  const links = suggestions || quickLinks || [];
  // Text displayed next to the outputted links
  let suggestionHeaderText = '';
  if (suggestions) {
    suggestionHeaderText = 'Suggested Results';
  } else if (quickLinks && quickLinks.length > 0) {
    suggestionHeaderText = 'Quick Links';
  }

  return (
    <div
      className={`${styles.headerSearchSuggestions} ${
        status === 'entered' ? styles.show : ''
      } ${links.length <= 0 ? styles.hide : ''}`}
      style={style}
    >
      <div className="container">
        <div className={styles.headerSearchSuggestionsContent}>
          <div className={styles.headerSearchQuickLinksHeader}>
            {suggestionHeaderText}
          </div>
          <div
            className={`${
              suggestions
                ? styles.headerSearchSuggestionsList
                : styles.headerSearchQuickLinks
            }`}
          >
            {links.map((item, id) => (
              <Link
                to={item.href}
                className={`${
                  suggestions
                    ? styles.headerSearchSuggestionsLink
                    : styles.headerSearchQuickLink
                } ${cursor === id + 1 && suggestions ? styles.active : ''}`}
                key={item.text + id}
                onClick={() => {
                  showSuggestions(false);
                }}
              >
                {item.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

HeaderSearchSuggestions.propTypes = {
  suggestions: PropTypes.array,
  cursor: PropTypes.number,
  quickLinks: PropTypes.array,
  status: PropTypes.string,
  showSuggestions: PropTypes.func,
  style: PropTypes.object
};

/*
  Search Component
  For search bar attached to the header element. A global search included on most site pages

  Props
  canToggle: bool if the search can toggle. it will always be open if not
  quickLinks: array of links from theme
  toggleSearch: method to toggle the searchOpen state of parent Header Component
  userLocation: redux store value of the user location
  getUserLocation: method to get the user location and store in redux store

  State
  query: the search query being typed by the user
  querySuggestions: array of autocomplete suggestions from the API search call
  showSuggestions: bool to show search suggestions or not
  mounted: is the component mounted? for animation in props
  cursor: state of autocomplete cursor when navigating by arrow keys
*/

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      querySuggestions: null,
      showSuggestions: false,
      mounted: false,
      cursor: 0
    };

    this.searchInput = React.createRef();
    this.updateQuery = this.updateQuery.bind(this);
    this.performSearch = this.performSearch.bind(this);
    this.showSuggestions = this.showSuggestions.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  // default props
  static defaultProps = {
    canToggle: true,
    quickLinks: [],
    toggleSearch: undefined,
    userLocation: {},
    getUserLocation: undefined
  };

  // for animations
  componentDidMount() {
    this.setState({ mounted: !this.state.mounted });
  }

  // takes a boolean to show suggestions or not for search
  showSuggestions(show) {
    this.setState({ showSuggestions: show });
  }

  // updates the query based on inputs value
  updateQuery(event) {
    const query = event.target.value;
    this.setState({ query }, this.getSearchSuggestions);
  }

  // key down handler for search input. moves cursor for autocomplete
  // and searches for selected sugessted value on enter
  // using +/- 1 to not have a selected suggestion on load
  handleKeyDown(event) {
    const { cursor, querySuggestions } = this.state;
    if (querySuggestions) {
      switch (event.key) {
        case 'ArrowDown':
          if (cursor < querySuggestions.length) {
            this.setState(prevState => ({
              cursor: prevState.cursor + 1
            }));
          }
          break;
        case 'ArrowUp':
          if (cursor > 0) {
            this.setState(prevState => ({
              cursor: prevState.cursor - 1
            }));
          }
          break;
        case 'Enter':
          if (cursor > 0) {
            event.preventDefault();
            this.props.history.push(querySuggestions[cursor - 1].href);
            this.searchInput.current.blur();
            this.showSuggestions(false);
            if (this.props.canToggle) {
              this.props.toggleSearch();
            }
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }
          break;
        default:
          this.setState({
            cursor: 0
          });
          break;
      }
    }
    return true;
  }

  // calls autocomplete api to get search suggestions with a debounce
  // TODO: should a component call the api like this?
  getSearchSuggestions = debounce(() => {
    if (this.state.query.length > 2) {
      API.getSearchSuggestions(this.state.query).then(data => {
        this.setState({
          querySuggestions: data.length > 0 ? data.slice(0, 7) : null,
          cursor: 0
        });
      });
    } else {
      this.setState({
        querySuggestions: null,
        cursor: 0
      });
    }
  }, 500);

  // executes a search action with the query from state or given
  performSearch(event, query = '') {
    if (event) {
      event.preventDefault();
    }
    if (query) {
      this.searchInput.current.value = query;
    }
    this.searchInput.current.blur();
    this.showSuggestions(false);
    this.props.history.push(
      `/search/${encodeURIComponent(
        query.toLowerCase() || this.state.query.toLowerCase()
      )}`
    );
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  render() {
    const {
      style,
      canToggle,
      userLocation,
      history,
      quickLinks,
      getUserLocation
    } = this.props;

    return (
      <div
        className={`${styles.headerSearch} ${this.state.showSuggestions &&
          styles.darken} light`}
        style={style}
        role="search"
      >
        <div className="container">
          <div className={styles.headerSearchBar}>
            <FadeInRight in={this.state.mounted} duration={300} delay={200}>
              <HeaderSearchForm
                performSearch={this.performSearch}
                updateQuery={this.updateQuery}
                showSuggestions={this.showSuggestions}
                handleKeyDown={this.handleKeyDown}
                query={this.state.query}
                autoFocus={canToggle && ask() === 'mouse'}
                inputRef={this.searchInput}
              />
            </FadeInRight>
            {userLocation && (
              <button
                type="button"
                onClick={() => {
                  getUserLocation();
                  this.setState({
                    query: '',
                    querySuggestions: null,
                    showSuggestions: false
                  });
                  history.push('/search/your-location');
                }}
                className={`${styles.headerSearchFindNearbyButton} light`}
              >
                <NavIcon
                  width={20}
                  height={20}
                  fill={'#b4b2b0'}
                  viewBox={'0 0 20 20'}
                  className={styles.headerSearchFindNearbyIcon}
                />
                <span>Find Nearby Centers</span>
              </button>
            )}
          </div>
        </div>
        <ExpandDown in={this.state.showSuggestions} duration={300} delay={0}>
          <HeaderSearchSuggestions
            quickLinks={quickLinks}
            suggestions={this.state.querySuggestions}
            cursor={this.state.cursor}
            showSuggestions={this.showSuggestions}
          />
        </ExpandDown>
      </div>
    );
  }
}

HeaderSearchSuggestions.propTypes = {
  canToggle: PropTypes.bool,
  quickLinks: PropTypes.array,
  toggleSearch: PropTypes.func,
  userLocation: PropTypes.object,
  getUserLocation: PropTypes.func
};

export default withRouter(Search);
