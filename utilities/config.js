'use strict';

const {defaultsDeep} = require('lodash');
const {resolve} = require('path');
const settings = require(resolve('./gulp.config'));

module.exports = (defaults, node, replace = false) => {
  if (settings.hasOwnProperty(node)) {
    if (replace) {
      return settings[node];
    }

    return defaultsDeep(settings[node], defaults);
  }

  return defaults;
};
