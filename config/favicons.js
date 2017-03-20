'use strict';

const paths = require('./paths');
const config = require('../utilities/config');

const defaults = {
  app: {
    background: '#ffffff',
    name: 'Application name',
    theme: '#ffffff'
  },
  appEnabled: false,
  input: paths.src.favicons.icon,
  output: {
    html: paths.src.favicons.output,
    icons: paths.dest.favicons,
    publicPath: paths.dest.favicons.replace(paths.dest.base, '')
  },
  platforms: {
    android: true,
    apple: true,
    coast: true,
    favicons: true,
    windows: true
  }
};

module.exports = config(defaults, 'favicons');
