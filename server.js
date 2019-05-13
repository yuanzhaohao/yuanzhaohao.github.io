'use strict';

var PORT = 3737;
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var mine = {
  css: 'text/css',
  gif: 'image/gif',
  html: 'text/html',
  ico: 'image/x-icon',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  js: 'text/javascript',
  json: 'application/json',
  pdf: 'application/pdf',
  png: 'image/png',
  svg: 'image/svg+xml',
  swf: 'application/x-shockwave-flash',
  tiff: 'image/tiff',
  txt: 'text/plain',
  wav: 'audio/x-wav',
  wma: 'audio/x-ms-wma',
  wmv: 'video/x-ms-wmv',
  xml: 'text/xml',
};

var server = http.createServer(function(request, response) {
  var pathname = url.parse(request.url).pathname;
  var realPath = '.' + pathname;
  var ext = path.extname(pathname);

  if (ext) {
    ext = ext.slice(1);
  } else {
    realPath += realPath.charAt(realPath.length - 1) === '/' ? 'index.html' : '/index.html';
    ext = 'html';
  }

  fs.exists(realPath, function(isExist) {
    if (!isExist) {
      response.writeHead(404, {
        'Content-Type': 'text/plain',
      });
      response.write('This request URL ' + pathname + ' was not found on this server.');
      response.end();
    } else {
      fs.readFile(realPath, 'binary', function(err, file) {
        if (err) {
          response.writeHead(500, {
            'Content-Type': 'text/plain',
          });
          response.end(err);
        } else {
          var contentType = mine[ext] || 'text/plain';
          response.writeHead(200, {
            'Content-Type': contentType,
          });
          response.write(file, 'binary');
          response.end();
        }
      });
    }
  });
});

server.listen(PORT);
console.log('Server running at port: ' + PORT + ' .');
