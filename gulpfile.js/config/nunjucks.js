'use strict';

const paths = require('./paths');
const config = require('../utilities/config');

const defaults = {
  envOptions: {
    watch: false
  },
  path: paths.src.templates.root
};

module.exports = config(defaults, 'nunjucks');
