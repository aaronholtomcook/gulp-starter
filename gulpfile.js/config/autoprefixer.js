'use strict';

const config = require('../utilities/config');

const defaults = {
  browsers: ['last 4 versions'],
  cascade: false
};

module.exports = config(defaults, 'autoprefixer');
