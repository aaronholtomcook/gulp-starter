'use strict';

const {join} = require('path');
const paths = require('./paths');
const config = require('../utilities/config');

const defaults = {
  fontHeight: 1001,
  fontName: 'icons',
  fontPath: join(paths.dest.fonts.replace(paths.dest.base, ''), '/'),
  formats: [
    'ttf',
    'eot',
    'woff',
    'woff2',
    'svg'
  ],
  normalize: true,
  prependUnicode: false
};

module.exports = config(defaults, 'iconfont');
