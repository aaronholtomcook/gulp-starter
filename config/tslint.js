'use strict';

var paths = require('./paths');

module.exports = {
  config: {
    configuration: paths.lint.ts
  },
  report: {
    summarizeFailureOutput: true,
    emitError: false
  },
  reporter: {
    sort: true,
    filename: paths.reports.ts
  }
};
