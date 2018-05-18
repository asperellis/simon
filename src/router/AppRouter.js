import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { default as Layout } from '../layouts/DefaultLayout';
import Home from './../containers/Home';
import Search from './../containers/Search';
import Mall from './../containers/Mall';
import ErrorPage from './../containers/Error';

const AppRouter = () => {
  return (
    <Router>
      <Layout theme={'simon'}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/search/:query?" component={Search} />
          <Route exact path="/mall" component={Mall} />
          <Route
            path="/mall/:mallShortName"
            exact
            strict
            render={({ match }) => {
              if (!/^[-a-zA-Z]*$/.test(match.params.mallShortName)) {
                return <ErrorPage />;
              }
              return <Mall match={match} />;
            }}
          />
          <Route component={ErrorPage} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default AppRouter;
