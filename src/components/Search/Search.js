import React, { Component } from 'react';
import styles from './Search.css';
import SearchIcon from './../../images/icons/search.svg';
import NavIcon from './../../images/icons/nav.svg';
import FadeInRight from './../Animations/FadeInRight';
import ExpandDown from './../Animations/ExpandDown';
import API from './../../api/api';
import { connect } from 'react-redux';
import { getUserLocation } from './../../actions/App';
import { Link } from 'react-router-dom';
import { ask } from 'what-input';
import { debounce } from './../../utils/utils';
import { withRouter } from 'react-router-dom';

const mapDispatchToProps = dispatch => {
  return {
    getUserLocation: () => dispatch(getUserLocation())
  };
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const HeaderSearchButton = ({ onClick, ...attributes }) => {
  return (
    <button
      onClick={onClick}
      className={styles.headerSearchBtn}
      {...attributes}
    >
      <SearchIcon
        width={23}
        height={23}
        fill={'#fff'}
        viewBox={'0 0 23 23'}
        className={styles.headerSearchIcon}
      />
    </button>
  );
};

class HeaderSearchForm extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      performSearch,
      updateQuery,
      query,
      handleKeyDown,
      showSuggestions,
      autoFocus,
      inputRef,
      ...attributes
    } = this.props;
    return (
      <form
        role="search"
        onSubmit={performSearch}
        className={styles.headerSearchForm}
        {...attributes}
      >
        <HeaderSearchButton
          onClick={performSearch}
          type="submit"
          aria-label="Search"
        />
        {!query && (
          <label
            htmlFor="headerSearchInput"
            className={styles.headerSearchLabel}
          >
            {'Search by center, store or location'}
          </label>
        )}
        <input
          type="search"
          autoFocus={autoFocus}
          className={styles.headerSearchInput}
          name="headerSearchInput"
          id="headerSearchInput"
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
  }
}

const HeaderSearchSuggestions = ({
  suggestions,
  status,
  showSuggestions,
  cursor,
  quickLinks,
  ...attributes
}) => {
  const links = suggestions || quickLinks || [];

  return (
    <div
      className={[
        styles.headerSearchSuggestions,
        status === 'entered' && styles.show
      ].join(' ')}
      {...attributes}
    >
      <div className="container">
        <div className={styles.headerSearchSuggestionsContent}>
          <div className={styles.headerSearchQuickLinksHeader}>
            {suggestions || (!quickLinks || !quickLinks.length)
              ? 'Suggested Results'
              : 'Quick Links'}
          </div>
          <div
            className={
              suggestions
                ? styles.headerSearchSuggestionsList
                : styles.headerSearchQuickLinks
            }
          >
            {links.map((item, id) => (
              <Link
                to={item.href}
                className={[
                  suggestions
                    ? styles.headerSearchSuggestionsLink
                    : styles.headerSearchQuickLink,
                  `${cursor === id + 1 && suggestions ? styles.active : ''}`
                ].join(' ')}
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

  // for animations
  componentDidMount() {
    this.setState({ mounted: !this.state.mounted });
  }

  componentWillUnmount() {
    // TODO stop this.getSearchSuggestions();
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
            this.props.toggleSearch();
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
    return (
      <div
        className={[
          styles.headerSearch,
          'light',
          this.state.showSuggestions && styles.darken
        ].join(' ')}
        style={this.props.style}
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
                autoFocus={this.props.canToggle && ask() === 'mouse'}
                inputRef={this.searchInput}
              />
            </FadeInRight>
            {this.props.user.location && (
              <button
                type="button"
                onClick={() => {
                  this.props.getUserLocation();
                  this.setState({
                    query: '',
                    querySuggestions: null,
                    showSuggestions: false
                  });
                  this.props.history.push('/search/your-location');
                }}
                className={[styles.headerSearchFindNearbyButton, 'light'].join(
                  ' '
                )}
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
            quickLinks={this.props.quickLinks}
            suggestions={this.state.querySuggestions}
            cursor={this.state.cursor}
            showSuggestions={this.showSuggestions}
          />
        </ExpandDown>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
