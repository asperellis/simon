import React, { Component } from 'react';
import { connect } from 'react-redux';
import SEO from './../components/SEO/SEO';
import Button from './../components/Buttons/Button';
import { logInUser, logOutUser } from './../actions/User';
import { setSearchToggle } from './../actions/UI';

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logInUser: () => dispatch(logInUser()),
    logOutUser: () => dispatch(logOutUser()),
    setSearchToggle: canToggle => dispatch(setSearchToggle(canToggle))
  };
};

class Home extends Component {
  componentDidMount() {
    this.props.setSearchToggle(false);
  }

  componentWillUnmount() {
    this.props.setSearchToggle(true);
  }

  render() {
    const { location } = this.props.user;
    return (
      <div className="container">
        <SEO />
        <h1>Home Page</h1>
        {location &&
          location.latitude && (
          <p>
              User Location:<br />
            {`Latitude ${location.latitude},
        Longitude ${location.longitude}`}
          </p>
        )}

        {this.props.user.status === 'LOGGED_OUT' ? (
          <Button onClick={this.props.logInUser}>FAKE LOGIN</Button>
        ) : (
          <Button onClick={this.props.logOutUser}>FAKE LOGOUT</Button>
        )}
        <p>
          This is an example of a page with a search open by default. Toggling
          removed to disallow the bar to be closed and prevent awkward white
          space where it used to be or moving content up
        </p>
        <p>
          HERE IS A BUNCH OF TEXT TO SIMULATE A FILLED PAGE TO PASS SEO AUDIT<br />
          This is an example of a page with a search open by default. Toggling
          removed to disallow the bar to be closed and prevent awkward white
          space where it used to be or moving content up
        </p>
        <p>
          This is an example of a page with a search open by default. Toggling
          removed to disallow the bar to be closed and prevent awkward white
          space where it used to be or moving content up
        </p>
        <p>
          This is an example of a page with a search open by default. Toggling
          removed to disallow the bar to be closed and prevent awkward white
          space where it used to be or moving content up
        </p>
        <p>
          This is an example of a page with a search open by default. Toggling
          removed to disallow the bar to be closed and prevent awkward white
          space where it used to be or moving content up
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
          imperdiet, ante iaculis imperdiet convallis, nisl neque vehicula dui,
          eget rutrum ante mauris a neque. Mauris sapien ante, mattis nec mollis
          eget, pellentesque a lectus. Pellentesque vitae aliquet tellus.
          Vestibulum scelerisque mattis pretium. Nullam ornare interdum felis,
          ac tincidunt ex pellentesque eleifend. Sed scelerisque pulvinar
          ornare. Maecenas ut turpis at nunc pretium gravida. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac
          turpis egestas. Vivamus consequat, neque lacinia fermentum auctor, dui
          libero dapibus dolor, vitae hendrerit massa est nec nulla. Donec ut
          luctus felis. Vivamus sit amet lobortis erat. Fusce ac laoreet nisi.
          Vivamus vitae urna at tortor interdum tincidunt et lacinia quam.
          Nullam eu est eget lorem porttitor aliquam ac at neque. Nulla
          ultricies nibh non nisl efficitur pulvinar. Class aptent taciti
          sociosqu ad litora torquent per conubia nostra, per inceptos
          himenaeos. Sed nulla nunc, tempor non turpis id, tincidunt ullamcorper
          erat. Pellentesque rutrum turpis nulla, id ultricies nunc facilisis
          quis. Cras convallis risus vel magna maximus, ac posuere elit tempor.
          Maecenas egestas eget ex euismod pretium. Fusce laoreet odio in eros
          laoreet, ac mattis magna faucibus. Sed consectetur leo eros, at
          scelerisque augue rhoncus at. Mauris ornare et libero non pharetra.
          Pellentesque viverra consectetur elit, sed eleifend tortor tincidunt
          vitae. Proin molestie sed dolor quis viverra. Ut tempor tortor ante,
          ac viverra tellus efficitur sit amet. Nunc semper metus ut purus
          congue placerat. Etiam pretium efficitur urna sit amet placerat. Sed
          nunc nisl, aliquam quis rutrum eu, sollicitudin in nisl. Etiam porta
          nec tellus eu venenatis. Duis eu massa et ipsum mattis malesuada.
          Quisque quis eros elementum, egestas elit eu, tincidunt ante. Duis
          mattis arcu vitae sem pharetra, sed venenatis elit consequat. Sed
          aliquet felis non viverra pretium. Nulla scelerisque odio et dictum
          imperdiet. Nunc at ligula orci. Etiam tristique viverra rhoncus.
          Nullam mi nulla, lobortis a euismod at, laoreet ut lorem. Morbi eu
          quam nisl. Mauris aliquam quam sit amet nisl blandit, quis imperdiet
          enim elementum. Duis imperdiet libero sed magna dignissim, quis
          vulputate diam imperdiet. Quisque id nulla a nibh rhoncus facilisis.
          Aliquam malesuada ultrices eros, at gravida quam bibendum et. Nullam
          ultrices lorem at dui auctor varius. Donec commodo pretium metus, et
          rhoncus massa commodo sit amet. Phasellus et nibh nisi. Suspendisse
          est nisl, rutrum sed placerat eget, venenatis id ex. Phasellus
          vestibulum nisl nec mi rhoncus aliquet. Aenean enim justo, imperdiet
          laoreet nisi in, rutrum lobortis justo. Nullam sapien odio, facilisis
          ut ipsum quis, bibendum maximus diam. Vivamus nec magna varius orci
          sagittis consectetur pulvinar in eros. Class aptent taciti sociosqu ad
          litora torquent per conubia nostra, per inceptos himenaeos. Maecenas
          ultricies sapien at elementum volutpat. Pellentesque mattis massa ac
          ligula convallis, in venenatis mauris laoreet. Sed rutrum tempor arcu.
          Nunc porttitor nisi eu dapibus suscipit. Nam consequat tortor id nibh
          pretium luctus. Sed molestie metus sem, eu hendrerit ante posuere
          imperdiet. Curabitur a egestas arcu, a tristique tellus. Pellentesque
          feugiat tincidunt bibendum. Vivamus laoreet at quam quis convallis.
          Mauris vel dui suscipit, fringilla felis in, blandit dolor. Aliquam in
          ante egestas, finibus odio at, tristique libero. Proin convallis justo
          nec mi ornare, et sollicitudin sapien pretium. Suspendisse sagittis
          tempus quam, sit amet molestie risus semper elementum. Ut et lorem
          orci. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere cubilia Curae; Integer sed mollis leo. Aenean vehicula, lorem
          et dictum fringilla, massa lectus laoreet turpis, quis auctor risus
          tellus eget ligula. Mauris mattis turpis a turpis gravida viverra.
        </p>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
