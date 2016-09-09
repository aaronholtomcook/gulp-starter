'use strict';

var paths = require('./paths');

module.exports = {
  entries: paths.src.js.entry,
  debug: process.env.NODE_ENV === 'development'
};
