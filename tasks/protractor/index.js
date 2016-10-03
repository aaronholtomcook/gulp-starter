'use strict';

var gulp = require('gulp');
var protractor = require('gulp-protractor').protractor;
var browsersync = require('browser-sync');
var paths = require('../../config/paths');
var settings = require('../../config/settings');
var config = {
  protractor: require('../../config/protractor')
};
var scripting = settings.scripting === 'ts' ? 'ts' : 'js';

function task () {
  return gulp
    .src(paths.src[scripting].e2e)
    .pipe(protractor(config.protractor.local))
    .on('error', function (e) {
      throw e;
    })
    .on('end', function () {
      browsersync.exit();
      process.exit();
    });
}

gulp.task('protractor', ['build', 'server'], task);

module.exports = task;
