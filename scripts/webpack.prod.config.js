'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');
const utils = require('./utils');
const config = require('./config');
const baseConfig = require('./webpack.base.config');
const distPath = utils.resolve(config.distPath);

const buildWebpackConfig = merge(baseConfig, {
  mode: 'production',
  output: {
    path: distPath,
    filename: 'js/[name].[chunkhash:7].js',
  },
});

module.exports = buildWebpackConfig;
