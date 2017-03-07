const config = require('../utilities/config');

const defaults = {
  collapseWhitespace: true,
  removeOptionalTags: true,
  removeComments: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  sortAttributes: true,
  sortClassName: true
};

module.exports = config(defaults, 'htmlmin');
