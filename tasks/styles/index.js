'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const nano = require('gulp-cssnano');
const gulpIf = require('gulp-if');
const uncss = require('gulp-uncss');
const livereload = require('gulp-livereload');
const paths = require('../../config/paths');
const errorHandler = require('../../utilities/errorHandler');
const settings = require('../../config/settings');
const config = {
  autoprefixer: require('../../config/autoprefixer'),
  nano: require('../../config/nano'),
  sass: require('../../config/sass'),
  uncss: require('../../config/uncss')
};

gulp.task('styles', () => gulp
  .src(paths.src.sass)
  .pipe(gulpIf(process.env.NODE_ENV === 'development', sourcemaps.init())) // Output sourcemaps for development
  .pipe(sass(config.sass))
  .pipe(gulpIf(settings.uncss && process.env.NODE_ENV === 'production', uncss(config.uncss))) // If enabled, run uncss to remove redundant CSS
  .pipe(autoprefixer(config.autoprefixer))
  .pipe(gulpIf(process.env.NODE_ENV === 'production', nano(config.nano))) // Minify for production
  .pipe(gulpIf(process.env.NODE_ENV === 'development', sourcemaps.write()))
  .on('error', errorHandler)
  .pipe(gulp.dest(paths.dest.css))
  .pipe(livereload()));
