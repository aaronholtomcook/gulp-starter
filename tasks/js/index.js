'use strict';

var gulp = require('gulp');
var gulpIf = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var browsersync = require('browser-sync');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var errorHandler = require('../../utilities/errorHandler');
var paths = require('../../config/paths');
var config = {
  browserify: require('../../config/browserify')
};

// TODO: ngInject
function task () {
  return browserify(config.browserify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulpIf(process.env.NODE_ENV === 'development', sourcemaps.init())) // Output sourcemaps for development
    .pipe(gulpIf(process.env.NODE_ENV === 'production', uglify())) // Minify for production
    .on('error', errorHandler)
    .pipe(gulpIf(process.env.NODE_ENV === 'development', sourcemaps.write()))
    .pipe(gulp.dest(paths.dest.js))
    .on('end', browsersync.reload);
}

gulp.task('js', task);

module.exports = task;
