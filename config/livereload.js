'use strict';

const config = require('../utilities/config');

const defaults = {
  port: 35729
};

module.exports = config(defaults, 'livereload');
