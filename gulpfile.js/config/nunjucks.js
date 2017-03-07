const paths = require('./paths');
const config = require('../utilities/config');

const defaults = {
  path: paths.src.templates.root,
  envOptions: {
    watch: false
  }
};

module.exports = config(defaults, 'nunjucks');
