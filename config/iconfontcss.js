'use strict';

const {join, resolve} = require('path');
const paths = require('./paths');
const config = require('../utilities/config');

const defaults = {
  fontName: 'icons',
  fontPath: join(paths.dest.fonts.replace(paths.dest.base, ''), '/'),
  path: resolve(__dirname, '../templates/_icons.scss'),
  targetPath: '../../../src/scss/components/_icons.scss'
};

module.exports = config(defaults, 'iconfontcss');
