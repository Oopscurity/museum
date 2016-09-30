import path from 'path';
import express from 'express';

import webpack from 'webpack';
import webpackConfig from '../../webpack.config.js';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createLocation } from 'history/LocationUtils';
import { RouterContext, match } from 'react-router';
import { Provider } from 'react-redux';

import configureStore from '../store';
import { getRoutes } from '../routing';

const app = express();
const renderTemplate = (html, initialState) => {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>12345</title>
        <link rel="stylesheet" type="text/css" href="/static/app.css">
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}; 
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
  `;
};

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      color: true
    }
  }));
  app.use(webpackHotMiddleware(compiler, { log: console.log }));
} else {
  app.use('/static', express.static(path.join(__dirname, '../../static')));
}

app.get('/*', (req, res) => {
  const routes = getRoutes();
  const location = createLocation(req.url);

  match({ routes, location }, (e, redirectLocation, renderProps) => {
    if (e) {
      console.log(e);
      return res.status(500).end('Internal server error');
    }

    if (!renderProps) {
      return res.status(404).end('Not found');
    }

    const store = configureStore();
    const html = ReactDOMServer.renderToString(
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    );
    const state = store.getState();
    
    res.status(200).end(renderTemplate(html, state));
  });
});

const server = app.listen(8080, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('App is listening at http://%s:%s', host, port);
});

