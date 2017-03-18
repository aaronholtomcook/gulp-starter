'use strict';

const config = require('../utilities/config');

const defaults = {
  gzip: true
};

module.exports = config(defaults, 'sizereport');
