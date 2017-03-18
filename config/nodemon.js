'use strict';

const paths = require('./paths');
const config = require('../utilities/config');

const defaults = {
  env: {
    NODE_ENV: process.env.NODE_ENV
  },
  script: paths.server,
  watch: [
    paths.server
  ]
};

module.exports = config(defaults, 'nodemon');
