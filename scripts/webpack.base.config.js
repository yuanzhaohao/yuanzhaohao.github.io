'use strict';

const path = require('path');
const exists = require('fs').existsSync;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const utils = require('./utils');
const config = require('./config');
const srcPath = utils.resolve(config.srcPath);
const entry = utils.getEntry(path.join(srcPath, './entry'));
const vendors =
  config.optimizeCommon && typeof config.optimizeCommon === 'object' ? config.optimizeCommon : {};

const createLintingRule = () => ({
  test: /\.(js|ts|tsx)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [srcPath],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: true,
  },
});

const createHappypackPlugin = () => {
  const os = require('os');
  const HappyPack = require('happypack');
  const threadPool = HappyPack.ThreadPool({
    size: os.cpus().length,
  });
  const createHappypack = (id, loaders) => {
    return new HappyPack({
      id,
      loaders,
      threadPool,
    });
  };

  return [
    createHappypack('js', [
      {
        path: 'babel-loader',
        query: {
          cacheDirectory: '.happypack_cache',
        },
      },
    ]),
    createHappypack('ts', [
      {
        path: 'ts-loader',
        query: {
          happyPackMode: true,
        },
      },
    ]),
    createHappypack('sass', [
      {
        loader: 'sass-loader',
        options: {
          data: "$icon-base-url: '//yuanzhaohao.github.io/dashkit-fonts';",
        },
      },
    ]),
    createHappypack('css', ['css-loader']),
  ];
};

const createHtmlPlugin = () => {
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  let defaultTplPath = path.join(srcPath, './template.html');
  return Object.keys(entry).map(page => {
    let pageTplPath = path.join(srcPath, `./${page}.html`);
    let templatePath = defaultTplPath;
    let chunks = Object.keys(vendors).concat(page);

    if (exists(pageTplPath)) templatePath = pageTplPath;

    return new HtmlWebpackPlugin({
      filename: `${page}.html`,
      template: templatePath,
      inject: 'body',
      chunksSortMode: 'dependency',
      minify: {
        removeComments: true,
        collapseWhitespace: false,
      },
      chunks,
    });
  });
};

module.exports = {
  entry: Object.assign({}, entry, vendors),
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json', '.css', '.scss', '.svg', '.md'],
    alias: {
      '@': srcPath,
    },
  },
  resolveLoader: {
    modules: [utils.resolve('node_modules')],
  },
  plugins: [...createHappypackPlugin(), ...createHtmlPlugin()],
  module: {
    rules: [
      ...(config.useEslint ? [createLintingRule()] : []),
      {
        test: /\.js$/,
        loader: 'happypack/loader?id=js',
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|tsx)$/,
        loader: 'happypack/loader?id=ts',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loader: [
          'style-loader',
          'happypack/loader?id=css',
          'postcss-loader',
          'happypack/loader?id=sass',
        ],
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true,
        },
        sourceMap: true,
      }),
    ],
  },
  stats: {
    errors: true,
    warnings: false,
  },
};
