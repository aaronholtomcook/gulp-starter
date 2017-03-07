const paths = require('./paths');
const config = require('../utilities/config');

const defaults = {
  includePaths: [
    paths.src.sass,
    paths.src.packages.node_modules
  ]
};

module.exports = config(defaults, 'sass');
