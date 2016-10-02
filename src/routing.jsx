import React from 'react';
import Route from 'react-router/lib/Route';

import App from './pages/app';
import MapPage from './pages/Map';

export function getRoutes() {
  return (
    <Route component={App}>
      <Route component={MapPage} name="map" path="/(map(/:id))" />
    </Route>
  );
}
