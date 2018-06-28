import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from './../components/Loader/Loader';
import SEO from './../components/SEO/SEO';
import { getUserLocation } from './../actions/User';
import { setSearchToggle, setLoading } from './../actions/UI';

const mapDispatchToProps = dispatch => {
  return {
    setSearchToggle: canToggle => dispatch(setSearchToggle(canToggle)),
    getUserLocation: () => dispatch(getUserLocation()),
    setLoading: isLoading => dispatch(setLoading(isLoading))
  };
};

const mapStateToProps = state => {
  return {
    user: state.user,
    isLoading: state.isLoading
  };
};

class Search extends Component {
  componentDidMount() {
    this.props.setSearchToggle(false);

    // temp to show loading component
    this.props.setLoading(true);
  }

  componentDidUpdate(nextProps) {
    if (this.props.isLoading === nextProps.isLoading) {
      this.props.setLoading(true);
    }
  }

  componentWillUnmount() {
    this.props.setSearchToggle(true);
  }

  render() {
    const { query } = this.props.match.params;
    const { location } = this.props.user;
    const { isLoading } = this.props;
    const locationSearch = query === 'your-location';
    const userHasLocation = location && location.latitude && location.longitude;
    return (
      <div className="container">
        <SEO url="search" />
        {isLoading ? (
          <div>
            <Loader />
            <button
              onClick={() => {
                this.props.setLoading(false);
              }}
            >
              Stop Loading
            </button>
          </div>
        ) : (
          <div>
            <h1>
              {query
                ? 'Search Page searching for ' + query
                : 'No Search query so show all the things'}
            </h1>
            <p>
              This is an example of a page with a search open by default.
              Toggling removed to disallow the bar to be closed and prevent
              awkward white space where it used to be or moving content up
            </p>
            {locationSearch && (
              <div>
                {userHasLocation ? (
                  <div>
                    LOCATION SEARCH! BOOM:<br />
                    {`Latitude ${location.latitude}, 
          Longitude ${location.longitude}`}
                  </div>
                ) : (
                  <p>
                    Location is blocked OR user has manually hit this route and
                    must ask for location based results again
                    <button onClick={this.props.getUserLocation}>
                      CLICK TO ASK
                    </button>
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
