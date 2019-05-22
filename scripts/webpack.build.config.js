'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

const buildWebpackConfig = merge(baseConfig, {
  mode: 'prodruction',
  plugins: [],
});

module.exports = buildWebpackConfig;
