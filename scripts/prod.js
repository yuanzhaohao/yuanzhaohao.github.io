'use strict';

const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const rm = require('rimraf');
const Prism = require('prismjs');
const utils = require('./utils');
const config = require('./config');
const webpackConfig = require('./webpack.prod.config');
const rootPath = utils.resolve('./');
const markdownPath = utils.resolve(config.markdownPath);
const srcPath = utils.resolve(config.srcPath);
let distPath = utils.resolve(config.distPath);

if (rootPath === distPath) {
  distPath = path.join(rootPath, './js');
}

buildListData(() => {
  rm(distPath, () => {
    webpack(webpackConfig, (err, stats) => {
      if (err || stats.hasErrors()) {
        utils.fatal(err);
      }
    });
  });
});

function buildListData(callback) {
  const data = glob.sync(path.join(markdownPath, './*.md')).map(filepath => {
    const sourceText = fs.readFileSync(filepath, 'utf8');
    const name = path.basename(filepath, '.md');
    const metaData = utils.yamlFront(sourceText);
    return {
      ...metaData,
      name,
    };
  });

  fs.writeFile(path.join(srcPath, './data.json'), JSON.stringify(data, null, 2), function(err) {
    if (err) {
      utils.fatal(err);
    }
    utils.success('Markdown list data written.');

    callback && callback();
  });
}

// rm(distPath, () => {
//   webpack(webpackConfig, (err, stats) => {
//     if (err || stats.hasErrors()) {
//       utils.fatal(err);
//     }
//   });
// });
