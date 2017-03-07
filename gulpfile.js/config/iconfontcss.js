const {join, resolve} = require('path');
const paths = require('./paths');
const config = require('../utilities/config');

const defaults = {
  fontName: 'icons',
  path: resolve(__dirname, '../templates/_icons.scss'),
  targetPath: '../../../src/scss/components/_icons.scss',
  fontPath: join(paths.dest.fonts.replace(paths.dest.base, ''), '/')
};

module.exports = config(defaults, 'iconfontcss');
