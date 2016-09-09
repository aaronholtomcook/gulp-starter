'use strict';

var gulp = require('gulp');
var tslint = require('gulp-tslint');
var reporter = require('gulp-tslint-jenkins-reporter');
var paths = require('../../config/paths');
var config = {
  tslint: require('../../config/tslint')
};

function task () {
  return gulp
    .src(paths.src.ts.scripts)
    .pipe(tslint(config.tslint.config))
    .pipe(tslint.report(config.tslint.report))
    .pipe(reporter(config.tslint.reporter));
}

gulp.task('ts:lint', task);

module.exports = task;
