'use strict';

var gulp = require('gulp');
var browsersync = require('browser-sync');
var config = {
  browsersync: require('../../config/browsersync')
};

function task () {
  browsersync(config.browsersync);
}

gulp.task('server', task);

module.exports = task;
