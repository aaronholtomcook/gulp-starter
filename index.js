'use strict';

const requireDir = require('require-dir');

module.exports = requireDir('./tasks', {
  recurse: true
});
