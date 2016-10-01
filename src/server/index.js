import path from 'path';
import express from 'express';

import webpack from 'webpack';
import webpackConfig from '../../webpack/webpack.client.dev.config.js';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';

import config from './config';
import configureStore from '../store';
import { getRoutes } from '../routing';

const app = express();

if (config.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      color: true
    }
  }));
  app.use(webpackHotMiddleware(compiler, { log: console.log }));
} else {
  app.use(express.static('public'));
}

const assets = require('../../assets.json');
const renderTemplate = (html, initialState) => {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Computer science museum</title>
        <link rel="stylesheet" type="text/css" href="${assets.main.css}">
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}; 
        </script>
        <script src="${assets.main.js}"></script>
      </body>
    </html>
  `;
};

app.get('*', (req, res) => {
  const routes = getRoutes();
  const history = createMemoryHistory(req.originalUrl);

  match({ routes, history }, (e, redirectLocation, renderProps) => {
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

    return res.status(200).end(renderTemplate(html, state));
  });
});

const server = app.listen(config.PORT, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('App is listening at http://%s:%s', host, port);
});

if (config.TIMEOUT) {
  server.setTimeout(config.TIMEOUT, (socket) => {
    const message = `Timeout of ${config.TIMEOUT}ms exceeded`;

    socket.end([
      'HTTP/1.1 503 Service Unavailable',
      `Date: ${new Date().toGMTString()}`,
      'Content-Type: text/plain',
      `Content-Length: ${message.length}`,
      'Connection: close',
      message
    ].join('\r\n'));
  });
}

