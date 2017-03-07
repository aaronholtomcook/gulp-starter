'use strict';

const config = require('../utilities/config');

const defaults = {
  htmlmin: false,
  port: 8080,
  scripting: 'ts',
  uncss: false
};

module.exports = config(defaults, 'settings');
