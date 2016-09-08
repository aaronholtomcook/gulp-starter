'use strict';

var gulp = require('gulp');
var gulpIf = require('gulp-if');
// var data = require('gulp-data');
var htmlmin = require('gulp-htmlmin');
var nunjucks = require('gulp-nunjucks-render');
var browsersync = require('browser-sync');
var path = require('path');
var paths = require('../../config/paths');
var errorHandler = require('../../utilities/errorHandler');
var config = {};

function task () {
  return gulp
    .src(paths.src.html)
    .pipe(nunjucks({
      path: path.resolve(paths.src.html.replace('/**/*.html', ''), '../')
    }))
    .pipe(gulpIf(process.env.NODE_ENV === 'production', htmlmin())) // Minify html for production
    .on('error', errorHandler)
    .pipe(gulp.dest(paths.dest.base))
    .on('end', browsersync.reload);
}

gulp.task('templates', task);

module.exports = task;
