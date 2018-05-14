import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { default as Layout } from '../layouts/DefaultLayout';
import Home from './../containers/Home';
import Search from './../containers/Search';
import ErrorPage from './../containers/Error';

const AppRouter = () => {
  return (
    <Router>
      <Layout theme={'simon'}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/search/:query?" component={Search} />
          <Route component={ErrorPage} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default AppRouter;
