'use strict';

var gulp = require('gulp');
var favicons = require('gulp-favicons');
var paths = require('../../config/paths');
var errorHandler = require('../../utilities/errorHandler');
var config = {
  favicons: require('../../config/favicons')
};

function task () {
  return gulp
    .src(paths.src.favicons.icon)
    .pipe(favicons(config.favicons))
    .on('error', errorHandler)
    .pipe(gulp.dest(paths.dest.favicons));
}

gulp.task('favicons', task);

module.exports = task;
