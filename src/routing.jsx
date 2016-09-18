import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';

import App from './pages/app';
import Home from './pages/home';
import Map from './pages/Map';

export function getRoutes() {
  return (
    <Route component={App}>
      <Route component={Home} path="/" />
      <Route path="/map">
        <IndexRoute component={Map} />
        <Route component={Map} path=":id" />
      </Route>
    </Route>
  );
}
