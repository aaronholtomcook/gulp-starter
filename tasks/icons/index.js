'use strict';

var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var iconfontcss = require('gulp-iconfont-css');
var paths = require('../../config/paths');
var errorHandler = require('../../utilities/errorHandler');
var config = {
  iconfont: require('../../config/iconfont'),
  iconfontcss: require('../../config/iconfontcss')
};

function task () {
  return gulp
    .src(paths.src.icons)
    .pipe(iconfontcss(config.iconfontcss))
    .on('error', errorHandler)
    .pipe(iconfont(config.iconfont))
    .on('error', errorHandler)
    .pipe(gulp.dest(paths.dest.fonts));
}

gulp.task('icons', task);

module.exports = task;
