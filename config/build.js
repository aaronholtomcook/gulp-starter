'use strict';

const settings = require('./settings');
const config = require('../utilities/config');
const conditional = require('../utilities/conditional');

const defaults = [
  [
    'clean:dist',
    'clean:reports'
  ],
  [
    'copy',
    'favicon',
    'fonts',
    'icons',
    'images'
  ],
  conditional(
    process.env.NODE_ENV === 'production',
    [
      'copy:revision',
      'fonts:revision',
      'images:revision'
    ]
  ),
  [
    'styles:lint',
    conditional(
      settings.scripting === 'ts',
      'scripts:tslint',
      'scripts:eslint'
    )
  ],
  [
    'scripts',
    'styles'
  ],
  conditional(
    process.env.NODE_ENV === 'production',
    'styles:references'
  ),
  conditional(
    process.env.NODE_ENV === 'production',
    'styles:revision'
  ),
  'templates',
  conditional(
    process.env.NODE_ENV === 'production',
    'templates:references'
  ),
  'clean:temp',
  'size-report'
];

module.exports = config(defaults, 'build', true);
