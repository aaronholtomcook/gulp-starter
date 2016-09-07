var path = require('path');
var paths = require('./paths');

module.exports = {
  fontName: 'icons',
  path: path.resolve(__dirname, '../templates/_icons.scss'),
  targetPath: '../../../src/scss/components/_icons.scss',
  fontPath: '../fonts/'
};
