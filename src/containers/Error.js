import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSearchToggle } from './../actions/UI';
import SEO from './../components/SEO/SEO';

const mapDispatchToProps = dispatch => {
  return {
    setSearchToggle: canToggle => dispatch(setSearchToggle(canToggle))
  };
};

class ErrorPage extends Component {
  componentDidMount() {
    this.props.setSearchToggle(false);
  }

  componentWillUnmount() {
    this.props.setSearchToggle(true);
  }

  render() {
    return (
      <div className="container">
        <SEO url="error" />
        <h1>ErrorPage</h1>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(ErrorPage);
