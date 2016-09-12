'use strict';

var gulp = require('gulp');
var gulpIf = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var babel = require('babelify');
var browsersync = require('browser-sync');
var browserify = require('browserify');
var tsify = require('tsify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var errorHandler = require('../../utilities/errorHandler');
var paths = require('../../config/paths');
var settings = require('../../config/settings');
var config = {
  browserify: require('../../config/browserify'),
  sourcemaps: require('../../config/sourcemaps')
};

// TODO: Angular 2 integration
// TODO: Tree shaking
function task () {
  return browserify(config.browserify)
    .plugin(tsify)
    .transform(babel)
    .bundle()
    .on('error', errorHandler)
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulpIf(process.env.NODE_ENV === 'development', sourcemaps.init(config.sourcemaps))) // Output sourcemaps for development
    .pipe(gulpIf(process.env.NODE_ENV === 'production', uglify())) // Minify for production
    .pipe(gulpIf(process.env.NODE_ENV === 'development', sourcemaps.write()))
    .pipe(gulp.dest(paths.dest.js))
    .on('end', browsersync.reload);
}

gulp.task('ts', task);

module.exports = task;
