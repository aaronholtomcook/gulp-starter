'use strict';

var gulp = require('gulp');
var revReplace = require('gulp-rev-replace');
var path = require('path');
var errorHandler = require('../../utilities/errorHandler');
var paths = require('../../config/paths');

function task () {
  return gulp
    .src(path.join(paths.dest.base, '/**/*.html'))
    .pipe(revReplace({
      manifest: gulp.src(paths.src.templates.manifest)
    }))
    .on('error', errorHandler)
    .pipe(gulp.dest(paths.dest.base));
}

gulp.task('rev:html', task);

module.exports = task;
