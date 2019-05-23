'use strict';

const HOST = 'localhost';
const PORT = 6006;

module.exports = {
  srcPath: './src',
  distPath: './',
  staticPath: './static',
  mockData: false,
  optimizeCommon: {
    'vendor-react': ['react', 'react-dom', 'react-router-dom'],
    'vendor-lib': ['classnames'],
  },
  host: HOST,
  port: PORT,
  autoOpen: true,
};
