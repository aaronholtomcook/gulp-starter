'use strict';

const config = require('../utilities/config');

const defaults = {
  loadMaps: true
};

module.exports = config(defaults, 'sourcemaps');
