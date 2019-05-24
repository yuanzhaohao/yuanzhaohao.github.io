'use strict';

const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const rm = require('rimraf');
const md = require('markdown-it')({
  html: true,
});
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

new Promise(function(resolve, reject) {
  const data = glob
    .sync(path.join(markdownPath, './*.md'))
    .map(filepath => {
      const sourceText = fs.readFileSync(filepath, 'utf8');
      const name = path.basename(filepath, '.md');
      const metaData = utils.yamlFront(sourceText);
      if (metaData.description) {
        metaData.description = md.render(metaData.description);
      }
      return {
        ...metaData,
        name,
      };
    })
    .filter(v => v.date)
    .sort((a, b) => {
      const d1 = +new Date(a.date);
      const d2 = +new Date(b.date);
      return d1 - d2;
    });

  fs.writeFile(path.join(srcPath, './data.json'), JSON.stringify(data, null, 2), function(err) {
    if (err) {
      reject(err);
    }
    utils.success('Data json file written.');

    resolve();
  });
})
  .then(function() {
    rm(distPath, () => {
      webpack(webpackConfig, (err, stats) => {
        if (err || stats.hasErrors()) {
          utils.fatal(err);
        }
      });
    });
  })
  .catch(function(err) {
    utils.fatal(err);
  });
