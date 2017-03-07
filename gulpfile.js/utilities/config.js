const {defaultsDeep} = require('lodash');
const {resolve} = require('path');
const settings = require(resolve('./gulp.config'));

module.exports = (defaults, node) => {
  if (settings.hasOwnProperty(node)) {
    return defaultsDeep(settings[node], defaults);
  }

  return defaults;
};
