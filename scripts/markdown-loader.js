'use strict';

const fs = require('fs-extra');
const path = require('path');
const loaderUtils = require('loader-utils');
const md = require('markdown-it')({
  html: true,
});
const glob = require('glob');

module.exports = function(source, options) {
  if (this.cacheable) {
    this.cacheable();
  }

  const sourcePath = path.dirname(this.resourcePath);
  const basename = path.basename(this.resourcePath, '.md');

  console.log(basename);

  return `module.exports = {` + `\n  markdown: ${JSON.stringify(md.render(source))},` + `};`;
};
