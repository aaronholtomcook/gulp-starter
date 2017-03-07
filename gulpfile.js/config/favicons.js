const paths = require('./paths');
const config = require('../utilities/config');

const defaults = {
  html: paths.src.favicons.output,
  path: '/assets/favicons',
  replace: true
};

module.exports = config(defaults, 'favicons');
