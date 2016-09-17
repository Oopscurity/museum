import React from 'react';
import Route from 'react-router/lib/Route';

import App from './pages/app';
import Home from './pages/home';

export function getRoutes() {
  return (
    <Route component={App}>
      <Route component={Home} path="/" />
    </Route>
  );
}
