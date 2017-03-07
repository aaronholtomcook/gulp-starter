'use strict';

const config = require('../utilities/config');

const defaults = {
  discardComments: {
    removeAll: true
  }
};

module.exports = config(defaults, 'nano');
