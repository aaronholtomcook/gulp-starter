'use strict';

var gulp = require('gulp');
var gulpIf = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var babel = require('babelify');
var browsersync = require('browser-sync');
var browserify = require('browserify');
var rollupify = require('rollupify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var errorHandler = require('../../utilities/errorHandler');
var paths = require('../../config/paths');
var settings = require('../../config/settings');
var config = {
  babel: require('../../config/babel'),
  browserify: require('../../config/browserify'),
  sourcemaps: require('../../config/sourcemaps'),
  uglify: require('../../config/uglify')
};

// TODO: ngInject + all the other bells and whistles that come with Angular 1
// TODO: Watchify?
function task () {
  var builder = browserify(config.browserify);

  // ES6
  if (settings.scripting === 'es6') {
    builder = builder
      .transform(rollupify)
      .transform(babel, config.babel);
  }

  return builder
    .bundle()
    .on('error', errorHandler)
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulpIf(process.env.NODE_ENV === 'development', sourcemaps.init(config.sourcemaps))) // Output sourcemaps for development
    .pipe(gulpIf(process.env.NODE_ENV === 'production', uglify(config.uglify))) // Minify for production
    .pipe(gulpIf(process.env.NODE_ENV === 'development', sourcemaps.write()))
    .pipe(gulp.dest(paths.dest.js))
    .on('end', browsersync.reload);
}

gulp.task('js', task);

module.exports = task;
