'use strict';

const {join} = require('path');
const paths = require('./paths');
const config = require('../utilities/config');

const defaults = {
  fontName: 'icons',
  fontPath: join(paths.dest.fonts.replace(paths.dest.base, ''), '/'),
  formats: [
    'ttf',
    'eot',
    'woff',
    'woff2',
    'svg'
  ],
  prependUnicode: false
};

module.exports = config(defaults, 'iconfont');
