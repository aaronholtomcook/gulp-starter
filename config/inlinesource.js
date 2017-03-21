'use strict';

const config = require('../utilities/config');

const defaults = {
  compress: false
};

module.exports = config(defaults, 'inlinesource');
