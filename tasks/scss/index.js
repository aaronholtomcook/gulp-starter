'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var nano = require('gulp-cssnano');
var gulpIf = require('gulp-if');
var uncss = require('gulp-uncss');
var browsersync = require('browser-sync');
var paths = require('../../config/paths');
var errorHandler = require('../../utilities/errorHandler');
var settings = require('../../config/settings');
var config = {
  autoprefixer: require('../../config/autoprefixer'),
  nano: require('../../config/nano'),
  sass: require('../../config/sass'),
  uncss: require('../../config/uncss')
};

function task () {
  return gulp
    .src(paths.src.sass)
    .pipe(gulpIf(process.env.NODE_ENV === 'development', sourcemaps.init())) // Output sourcemaps for development
    .pipe(sass(config.sass))
    .on('error', errorHandler)
    .pipe(gulpIf(settings.uncss && process.env.NODE_ENV === 'production', uncss(config.uncss))) // If enabled, run uncss to remove redundant CSS
    .on('error', errorHandler)
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(gulpIf(process.env.NODE_ENV === 'production', nano(config.nano))) // Minify for production
    .pipe(gulpIf(process.env.NODE_ENV === 'development', sourcemaps.write()))
    .pipe(gulp.dest(paths.dest.css))
    .pipe(browsersync.stream());
}

gulp.task('scss', task);

module.exports = task;
