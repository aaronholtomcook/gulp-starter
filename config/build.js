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
    'copy:revision'
  ),
  conditional(
    process.env.NODE_ENV === 'production',
    'favicon:revision:icons'
  ),
  conditional(
    process.env.NODE_ENV === 'production',
    'fonts:revision'
  ),
  conditional(
    process.env.NODE_ENV === 'production',
    'images:revision'
  ),
  conditional(
    process.env.CDN,
    'manifests:cdn'
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
    'pause'
  ),
  conditional(
    process.env.CDN,
    'manifests:cdn'
  ),
  conditional(
    process.env.NODE_ENV === 'production',
    'favicons:references'
  ),
  conditional(
    process.env.NODE_ENV === 'production',
    'styles:references'
  ),
  conditional(
    process.env.NODE_ENV === 'production',
    'favicon:revision:manifests'
  ),
  conditional(
    process.env.NODE_ENV === 'production',
    'styles:revision'
  ),
  conditional(
    process.env.CDN,
    'manifests:cdn'
  ),
  'templates',
  conditional(
    process.env.NODE_ENV === 'production',
    'templates:references'
  ),
  'clean:temp',
  'size-report'
];

module.exports = config(defaults.filter(Boolean), 'build', true);
