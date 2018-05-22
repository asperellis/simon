import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSearchToggle } from './../actions/App';

const mapDispatchToProps = dispatch => {
  return {
    setSearchToggle: canToggle => dispatch(setSearchToggle(canToggle))
  };
};

class Search extends Component {
  componentDidMount() {
    this.props.setSearchToggle(false);
  }

  render() {
    return (
      <div className="container">
        <h1>
          {this.props.match.params.query
            ? 'Search Page searching for ' + this.props.match.params.query
            : 'No Search query so show all the things'}
        </h1>
        <p>
          This is an example of a page with a search open by default. Toggling
          removed to disallow the bar to be closed and prevent awkward white
          space where it used to be or moving content up
        </p>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Search);
