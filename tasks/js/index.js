'use strict';

var gulp = require('gulp');
var gulpIf = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var babel = require('babelify');
var envify = require('envify/custom');
var browsersync = require('browser-sync');
var persistify = require('persistify');
var rollupify = require('rollupify');
var ngHtml2Js = require('browserify-ng-html2js');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var errorHandler = require('../../utilities/errorHandler');
var paths = require('../../config/paths');
var settings = require('../../config/settings');
var config = {
  babel: require('../../config/babel'),
  browserify: require('../../config/browserify'),
  persistify: require('../../config/persistify'),
  envify: require('../../config/envify'),
  sourcemaps: require('../../config/sourcemaps'),
  uglify: require('../../config/uglify')
};

function task () {
  var builder = persistify(config.browserify, config.persistify);

  // Angular template cache
  if (settings.angular1) {
    builder = builder.transform(ngHtml2Js());
  }

  // ES6
  if (settings.scripting === 'es6') {
    builder = builder
      .transform(rollupify)
      .transform(babel, config.babel);
  }

  // Process node environment values in your scripts
  builder = builder.transform(envify(config.envify));

  return builder
    .bundle()
    .on('error', errorHandler)
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulpIf(process.env.NODE_ENV === 'development', sourcemaps.init(config.sourcemaps))) // Output sourcemaps for development
    .pipe(gulpIf(settings.angular1, ngAnnotate()))
    .pipe(gulpIf(process.env.NODE_ENV === 'production', uglify(config.uglify))) // Minify for production
    .pipe(gulpIf(process.env.NODE_ENV === 'development', sourcemaps.write()))
    .pipe(gulp.dest(paths.dest.js))
    .on('end', browsersync.reload);
}

gulp.task('js', task);

module.exports = task;
