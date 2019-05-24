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
let distPath = utils.resolve(config.distPath);

if (rootPath === distPath) {
  distPath = path.join(rootPath, './js');
}

const mdFiles = glob.sync(path.join(markdownPath, './gruntjs-usage.md'));

mdFiles.forEach(filepath => {
  const sourceText = fs.readFileSync(filepath, 'utf8');
  const metaData = utils.yamlFront(sourceText);
  console.log(metaData);
  const reg = /```(.*)[js|json|javascript]\s?([^]+?)```/gi;
  sourceText.replace(reg, function(codeText) {
    console.log(codeText);
  });
});

// rm(distPath, () => {
//   webpack(webpackConfig, (err, stats) => {
//     if (err || stats.hasErrors()) {
//       utils.fatal(err);
//     }
//   });
// });
