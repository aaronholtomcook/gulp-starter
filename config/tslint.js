'use strict';

var paths = require('./paths');

module.exports = {
  config: {
    configuration: paths.lint.ts
  },
  report: {
    summarizeFailureOutput: true,
    emitError: process.env.NODE_ENV === 'production'
  },
  reporter: {
    sort: true,
    filename: paths.reports.ts
  }
};
