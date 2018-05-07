import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './../containers/App';
import Home from './../containers/Home';
import Search from './../containers/Search';
import ErrorPage from './../containers/Error';

const AppRouter = () => {
  return (
    <Router>
      <App>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/search/:query?" component={Search} />
          <Route component={ErrorPage} />
        </Switch>
      </App>
    </Router>
  );
};

export default AppRouter;
