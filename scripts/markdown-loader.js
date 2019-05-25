'use strict';

const fs = require('fs-extra');
const path = require('path');
// const marked = require('marked');
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

  // 处理页头的meta信息
  source = source.replace(/<!--(.*)\s?([^]+?)-->/gi, '');

  return `module.exports = {` + `\n  markdown: ${JSON.stringify(md.render(source))},` + `};`;
};
