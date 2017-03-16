'use strict';

const config = require('../utilities/config');

const defaults = {
  collapseWhitespace: true,
  removeComments: true,
  removeOptionalTags: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  sortAttributes: true,
  sortClassName: true
};

module.exports = config(defaults, 'htmlmin');
