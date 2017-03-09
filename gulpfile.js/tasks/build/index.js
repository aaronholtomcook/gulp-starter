'use strict';

const gulp = require('gulp');
const sequence = require('gulp-sequence');
const production = require('../../utilities/production');

// TODO: Make this configurable
gulp.task('build', (cb) => sequence(
  'clean:dist',
  [
    'copy',
    'fonts',
    'icons',
    'images'
  ],
  production(
    [
      'copy:revision',
      'fonts:revision',
      'images:revision'
    ]
  ),
  'clean:temp',
  cb
));
