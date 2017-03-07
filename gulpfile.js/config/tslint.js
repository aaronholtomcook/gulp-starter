'use strict';

const paths = require('./paths');
const config = require('../utilities/config');

const defaults = {
  config: {
    configuration: paths.lint.ts
  },
  report: {
    emitError: process.env.NODE_ENV === 'production',
    summarizeFailureOutput: true
  },
  reporter: {
    filename: paths.reports.ts,
    sort: true
  }
};

module.exports = config(defaults, 'tslint');
