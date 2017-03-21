'use strict';

const paths = require('./paths');
const config = require('../utilities/config');

const defaults = {
  compress: false,
  rootpath: paths.dest.base
};

module.exports = config(defaults, 'inlinesource');
