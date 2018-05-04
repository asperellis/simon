import React, { Component } from 'react';
import styles from './Search.css';
import SearchIcon from './../../images/icons/search.svg';
import NavIcon from './../../images/icons/nav.svg';
import FadeInRight from './../Animations/FadeInRight';
import ExpandDown from './../Animations/ExpandDown';
import API from './../../api/api';
import { debounce } from './../../utils/utils';

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

const HeaderSearchForm = ({
  performSearch,
  updateQuery,
  query,
  handleKeyDown,
  toggleSuggestions,
  ...attributes
}) => {
  return (
    <form
      role="search"
      onSubmit={performSearch}
      className={styles.headerSearchForm}
      {...attributes}
    >
      <HeaderSearchButton onClick={performSearch} type="submit" />
      {!query && (
        <label htmlFor="headerSearchInput" className={styles.headerSearchLabel}>
          {'Search by center, store or location'}
        </label>
      )}
      <input
        type="search"
        autoFocus
        className={styles.headerSearchInput}
        name="headerSearchInput"
        id="headerSearchInput"
        onKeyDown={handleKeyDown}
        onFocus={() => {
          toggleSuggestions(true);
        }}
        onBlur={() => {
          toggleSuggestions(query.length > 0);
        }}
        onChange={updateQuery}
        aria-label="Search by center, store or location"
        autoComplete="off"
      />
    </form>
  );
};

const HeaderSearchSuggestions = ({
  suggestions,
  transitionStatus,
  cursor,
  ...attributes
}) => {
  const quickLinks = [
    {
      href: 'https://www.simon.com/mall',
      text: 'See All Properties'
    },
    {
      href: 'https://www.simon.com/mall-insider',
      text: 'Mall Insider'
    },
    {
      href: 'https://www.premiumoutlets.com/vip',
      text: 'VIP Club'
    },
    {
      href: 'http://www.simon.com/brands',
      text: 'Brands'
    },
    {
      href: 'https://www.simon.com/giftcard',
      text: 'Simon Giftcard®'
    },
    {
      href: 'https://www.simon.com/travel',
      text: 'Travel & Tourism'
    }
  ];
  const links = suggestions || quickLinks;

  return (
    <div
      className={[
        styles.headerSearchSuggestions,
        transitionStatus === 'entered' && styles.show
      ].join(' ')}
      {...attributes}
    >
      <div className="container">
        <div className={styles.headerSearchSuggestionsContent}>
          <div className={styles.headerSearchQuickLinksHeader}>
            {suggestions ? 'Suggested Results' : 'Quick Links'}
          </div>
          <div
            className={
              suggestions
                ? styles.headerSearchSuggestionsList
                : styles.headerSearchQuickLinks
            }
          >
            {links.map((item, id) => (
              <a
                href={item.href || 'https://www.simon.com'}
                className={[
                  suggestions
                    ? styles.headerSearchSuggestionsLink
                    : styles.headerSearchQuickLink,
                  `${cursor === id + 1 && suggestions ? styles.active : ''}`
                ].join(' ')}
                title={item.text}
                key={item.text + id}
              >
                {item.text}
              </a>
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

    this.updateQuery = this.updateQuery.bind(this);
    this.performSearch = this.performSearch.bind(this);
    this.toggleSuggestions = this.toggleSuggestions.bind(this);
    this.debounceSearch = this.debounceSearch.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    this.setState({ mounted: !this.state.mounted });
  }

  toggleSuggestions(showSuggestions) {
    this.setState({ showSuggestions });
  }

  updateQuery(event) {
    const query = event.target.value;
    this.setState({ query }, this.debounceSearch);
  }

  handleKeyDown(event) {
    const { cursor, querySuggestions } = this.state;
    if (querySuggestions) {
      switch (event.key) {
        case 'ArrowDown':
          // Do something for "down arrow" key press.
          if (cursor < querySuggestions.length) {
            this.setState(prevState => ({
              cursor: prevState.cursor + 1
            }));
          }
          break;
        case 'ArrowUp':
          // Do something for "up arrow" key press.
          if (cursor > 0) {
            this.setState(prevState => ({
              cursor: prevState.cursor - 1
            }));
          }
          break;
        case 'Enter':
          event.preventDefault();
          // console.log(`Search for Value ${querySuggestions[cursor].text}`);
          break;
        default:
          this.setState({
            cursor: 0
          });
          break;
      }
    }
  }

  performSearch(event) {
    if (event) {
      event.preventDefault();
    }

    if (this.state.query.length > 2) {
      API.getSearchSuggestions(this.state.query).then(data => {
        this.setState({
          querySuggestions: data.length > 0 ? data.slice(0, 7) : null,
          cursor: 0
        });
      });
    } else {
      this.setState({ querySuggestions: null, cursor: 0 });
    }
  }

  debounceSearch = debounce(this.performSearch, 500);

  render() {
    return (
      <div
        className={[
          styles.headerSearch,
          'light',
          this.state.showSuggestions && styles.darken
        ].join(' ')}
        style={this.props.style}
      >
        <div className="container">
          <div className={styles.headerSearchBar}>
            <FadeInRight in={this.state.mounted} duration={300} delay={200}>
              <HeaderSearchForm
                performSearch={this.performSearch}
                updateQuery={this.updateQuery}
                toggleSuggestions={this.toggleSuggestions}
                handleKeyDown={this.handleKeyDown}
                query={this.state.query}
              />
            </FadeInRight>
            <button
              type="button"
              onClick={this.props.getUserLocation}
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
          </div>
        </div>
        <ExpandDown in={this.state.showSuggestions} duration={300} delay={0}>
          <HeaderSearchSuggestions
            suggestions={this.state.querySuggestions}
            cursor={this.state.cursor}
          />
        </ExpandDown>
      </div>
    );
  }
}

export default Search;
