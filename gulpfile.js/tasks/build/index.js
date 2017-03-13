'use strict';

const gulp = require('gulp');
const sequence = require('gulp-sequence');
const settings = require('../../config/settings');
const conditional = require('../../utilities/conditional');

// TODO: Make this configurable
gulp.task('build', (cb) => sequence(
  'clean:dist',
  [
    'copy',
    'fonts',
    'icons',
    'images'
  ],
  conditional(
    process.env.NODE_ENV,
    'production',
    [
      'copy:revision',
      'fonts:revision',
      'images:revision'
    ]
  ),
  [
    conditional(
      settings.scripting,
      'ts',
      'scripts:tslint'
    ),
    conditional(
      settings.scripting,
      'js',
      'scripts:eslint'
    )
  ],
  'clean:temp',
  cb
));
