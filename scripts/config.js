'use strict';

const HOST = 'localhost';
const PORT = 6006;

module.exports = {
  srcPath: './src',
  distPath: './dist',
  mockPath: './mock',
  mockData: false,
  optimizeCommon: {
    'vendor-react': ['react', 'react-dom', 'react-router-dom'],
    'vendor-redux': ['redux', 'react-redux', 'react-router-redux', 'redux-thunk'],
    // 'vendor-dashkit': [
    //   'dashkit-ui',
    // ],
    'vendor-lib': ['classnames', 'axios'],
  },
  host: HOST,
  port: PORT,
  autoOpen: true,
  useEslint: false,
  extractStyle: false,
  proxyTable: {
    'mock-api': `http://${HOST}:${PORT}`,
  },
};
