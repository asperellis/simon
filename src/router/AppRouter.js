import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

// Layout - Header, Footer, and all other app level items that always need to be included
import { default as Layout } from '../layouts/DefaultLayout';

// Containers
import Home from './../containers/Home';
import Search from './../containers/Search';
import Brand from './../containers/Brand';
import Mall from './../containers/Mall';
import ErrorPage from './../containers/Error';

const AppRouter = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          {/* HOME */}
          <Route exact path="/" component={Home} />

          {/*
            SEARCH
              /search - show all
              /search/:query - show results for query
          */}
          <Route exact path="/search" component={Search} />
          <Route path="/search/:query" component={Search} />

          {/*
            BRAND
              /brand/:brandName - show brand page with all properties that have it
          */}
          <Route path="/brand/:brandName" component={Brand} />

          {/*
            MALL
              /mall - show all malls
              /mall/:shortName - specific mall page
          */}
          <Route exact path="/mall" component={Mall} />
          <Route
            path="/mall/:shortName"
            exact
            strict
            render={({ match }) => {
              if (!/^[-a-zA-Z0-9]*$/.test(match.params.shortName)) {
                return <ErrorPage />;
              }
              return <Mall match={match} />;
            }}
          />

          {/* 404 ERROR */}
          <Route component={ErrorPage} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default AppRouter;
