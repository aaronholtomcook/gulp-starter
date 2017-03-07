const paths = require('./paths');
const config = require('../utilities/config');

const defaults = {
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

module.exports = config(defaults, 'tslint');
