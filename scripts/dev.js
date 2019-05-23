'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const portfinder = require('portfinder');
const openBrowser = require('react-dev-utils/openBrowser');
const utils = require('./utils');
const config = require('./config');
const webpackConfig = require('./webpack.dev.config');
const staticPath = utils.resolve(config.staticPath || './static');

const HOST = config.host;
const PORT = config.port;
const URI = `http://${HOST}:${PORT}/`;

const app = express();
const compiler = webpack(webpackConfig);
const devMiddleware = require('webpack-dev-middleware')(compiler, {
  quiet: true,
});

app.use('/static', express.static(staticPath));
app.use(require('connect-history-api-fallback')());
app.use(devMiddleware);

utils.log('starting dev server...');
devMiddleware.waitUntilValid(function() {
  const uri = `${URI}index.html`;

  utils.success(`Listening at ${uri}\n`);
  openBrowser(uri);
});

if (config.proxyTable && Object.keys(config.proxyTable).length > 0) {
  let proxyMiddleware = require('http-proxy-middleware');

  Object.keys(config.proxyTable).forEach(function(context) {
    let options = config.proxyTable[context];
    if (typeof options === 'string') {
      options = {
        target: options,
      };
    }
    app.use(proxyMiddleware(options.filter || context, options));
  });

  if (fs.existsSync(utils.resolve(config.mockPath))) {
    const mockRouter = express.Router();
    const mockPath = utils.resolve(config.mockPath);
    mockRouter.all('/:method', (req, res) => {
      let method = req.params.method.replace(/\.json$/, '');
      let jsonPath = path.join(mockPath, method + '.json');
      delete require.cache[require.resolve(jsonPath)];
      res.json(require(jsonPath));
    });
    app.use('/mock-api', mockRouter);
  }
}

portfinder.basePort = PORT;
portfinder.getPort((err, port) => {
  if (err) {
    throw err;
  }

  app.listen(port);
});
