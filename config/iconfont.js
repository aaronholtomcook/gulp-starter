'use strict';

const config = require('../utilities/config');

const defaults = {
  fontName: 'icons',
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
