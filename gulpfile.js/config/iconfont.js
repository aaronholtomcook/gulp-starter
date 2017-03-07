const config = require('../utilities/config');

const defaults = {
  fontName: 'icons',
  prependUnicode: true,
  formats: [
    'ttf',
    'eot',
    'woff',
    'woff2',
    'svg'
  ]
};

module.exports = config(defaults, 'iconfont');
