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
  prependUnicode: true
};

module.exports = config(defaults, 'iconfont');
