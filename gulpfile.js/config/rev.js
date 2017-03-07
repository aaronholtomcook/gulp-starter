const config = require('../utilities/config');

const defaults = {
  merge: true
};

module.exports = config(defaults, 'rev');
