'use strict';

const gulp = require('gulp');
const iconfont = require('gulp-iconfont');
const iconfontcss = require('gulp-iconfont-css');
const livereload = require('gulp-livereload');
const paths = require('../../config/paths');
const errorHandler = require('../../utilities/errorHandler');
const config = {
  iconfont: require('../../config/iconfont'),
  iconfontcss: require('../../config/iconfontcss')
};

gulp.task('icons', () => gulp
  .src(paths.src.icons)
  .pipe(iconfontcss(config.iconfontcss))
  .on('error', errorHandler)
  .pipe(iconfont(config.iconfont))
  .on('error', errorHandler)
  .pipe(gulp.dest(paths.dest.fonts))
  .pipe(livereload()));
