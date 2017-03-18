'use strict';

const paths = require('./paths');
const config = require('../utilities/config');

const defaults = {
  env: {
    NODE_ENV: process.env.NODE_ENV
  },
  script: paths.server.run,
  watch: [
    paths.server.app
  ]
};

module.exports = config(defaults, 'nodemon');
