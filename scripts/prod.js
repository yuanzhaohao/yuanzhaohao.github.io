'use strict';

const path = require('path');
const webpack = require('webpack');
const rm = require('rimraf');
const utils = require('./utils');
const config = require('./config');
const webpackConfig = require('./webpack.prod.config');
const rootPath = utils.resolve('./');
let distPath = utils.resolve(config.distPath);

if (rootPath === distPath) {
  distPath = path.join(rootPath, './js');
}

rm(distPath, () => {
  webpack(webpackConfig, (err, stats) => {
    if (err || stats.hasErrors()) {
      utils.fatal(err);
    }
  });
});
