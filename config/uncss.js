'use strict';

const {resolve} = require('path');
const paths = require('./paths');
const config = require('../utilities/config');

const defaults = {
  html: [
    resolve(paths.dest.base, '**/*.html')
  ],
  ignore: [
    /\.fade/,
    /\.modal/,
    '.affix',
    /\.tooltip/,
    /\.popover/,
    /\.collaps/,
    /\.carousel-inner/,
    /\.open/,
    /\.in/,
    /\.js/
  ]
};

module.exports = config(defaults, 'uncss');
