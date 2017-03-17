'use strict';

const paths = require('./paths');

const defaults = {
  script: paths.server,
  watch: [
    paths.server
  ],
  env: {
    NODE_ENV: process.env.NODE_ENV
  }
};

module.exports = config(defaults, 'nodemon');
