'use strict';

var gulp = require('gulp');
var revReplace = require('gulp-rev-replace');
var merge = require('merge-stream');
var path = require('path');
var errorHandler = require('../../utilities/errorHandler');
var paths = require('../../config/paths');

function task () {
  var css = gulp
    .src(path.join(paths.dest.css, '/**/*.css'))
    .pipe(revReplace({
      manifest: gulp.src(paths.src.templates.manifest)
    }))
    .on('error', errorHandler)
    .pipe(gulp.dest(paths.dest.css));

  var favicon = gulp
    .src(path.join(paths.dest.favicons, '/**/*.{json,webapp,xml}'))
    .pipe(revReplace({
      manifest: gulp.src(paths.src.templates.manifest),
      replaceInExtensions: [
        '.json',
        '.webapp',
        '.xml'
      ]
    }))
    .on('error', errorHandler)
    .pipe(gulp.dest(paths.dest.favicons));

  return merge(css, favicon);
}

gulp.task('rev:references', task);

module.exports = task;
