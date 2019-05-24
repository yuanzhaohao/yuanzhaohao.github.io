'use strict';

const path = require('path');
const glob = require('glob');
const chalk = require('chalk');
const format = require('util').format;
const yaml = require('js-yaml');
const yamlFront = require('yaml-front-matter');

exports.resolve = function(dir) {
  return path.join(__dirname, '..', dir || '');
};

exports.getEntry = function(globPath) {
  const files = Array.prototype.concat(
    glob.sync(path.join(globPath, './*.tsx')),
    glob.sync(path.join(globPath, './*.ts')),
    glob.sync(path.join(globPath, './*.js')),
  );
  const entries = {};

  files.forEach(filepath => {
    const name = filepath.replace(/(.*\/)*([^.]+).*/gi, '$2');
    if (name && !entries[name]) {
      entries[name] = filepath;
    }
  });

  return entries;
};

const prefix = '   yzh-blog';
const sep = chalk.gray('·');

/**
 * Log a `message` to the console.
 *
 * @param {String} message
 */

exports.log = function() {
  const msg = format.apply(format, arguments);
  console.log(chalk.white(prefix), sep, msg);
};

/**
 * Log an error `message` to the console and exit.
 *
 * @param {String} message
 */

exports.fatal = function(message) {
  if (message instanceof Error) message = message.message.trim();
  const msg = format.apply(format, arguments);
  console.error(chalk.red(prefix), sep, msg);
  process.exit(1);
};

/**
 * Log a success `message` to the console and exit.
 *
 * @param {String} message
 */

exports.success = function() {
  const msg = format.apply(format, arguments);
  console.log(chalk.white(prefix), sep, msg);
};

exports.getDataCode = function(markdownText) {
  if (markdownText) {
    const reg = /```(.*)[js|json|javascript]\s?([^]+?)```/;
    const sourceMatch = markdownText.match(reg);
    if (sourceMatch && sourceMatch.length && sourceMatch[2]) {
      return sourceMatch[2];
    }
  }
  return '';
};

exports.yamlFront = function(markdownText, options, loadSafe) {
  let contentKeyName =
    options && typeof options === 'string'
      ? options
      : options && options.contentKeyName
      ? options.contentKeyName
      : '__content';
  let passThroughOptions = options && typeof options === 'object' ? options : undefined;
  let result = {};
  const reg = /<!--(.*)\s?([^]+?)-->/;
  const metaMatch = reg.exec(markdownText);
  let yamlOrJson;
  if ((yamlOrJson = metaMatch[2])) {
    if (yamlOrJson.charAt(0) === '{') {
      result = JSON.parse(yamlOrJson);
    } else {
      if (loadSafe) {
        result = yaml.safeLoad(yamlOrJson, passThroughOptions);
      } else {
        result = yaml.load(yamlOrJson, passThroughOptions);
      }
    }
  }
  return result;
};
