import React from 'react';
import Route from 'react-router/lib/Route';

import App from './pages/App';
import MapPage from './pages/Map';
import GraphPage from './pages/Graph';

export function getRoutes() {
  return (
    <Route component={App}>
      <Route component={MapPage} name="map" path="/(map(/:id))" />
      <Route component={GraphPage} name="graph" path="graph" />
    </Route>
  );
}
