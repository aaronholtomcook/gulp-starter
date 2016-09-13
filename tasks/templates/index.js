'use strict';

var gulp = require('gulp');
var gulpIf = require('gulp-if');
var data = require('gulp-data');
var htmlmin = require('gulp-htmlmin');
var nunjucks = require('gulp-nunjucks-render');
var browsersync = require('browser-sync');
var fs = require('fs');
var paths = require('../../config/paths');
var errorHandler = require('../../utilities/errorHandler');
var settings = require('../../config/settings');
var config = {
  htmlmin: require('../../config/htmlmin'),
  nunjucks: require('../../config/nunjucks')
};

function task () {
  return gulp
    .src(paths.src.templates.pages)
    .pipe(data(JSON.parse(fs.readFileSync(paths.src.templates.data, 'utf8'))))
    .on('error', errorHandler)
    .pipe(nunjucks(config.nunjucks))
    .on('error', errorHandler)
    .pipe(gulpIf(process.env.NODE_ENV === 'production' && settings.htmlmin, htmlmin(config.htmlmin))) // Minify html for production if enabled
    .pipe(gulp.dest(paths.dest.base))
    .on('end', browsersync.reload);
}

gulp.task('templates', task);

module.exports = task;
