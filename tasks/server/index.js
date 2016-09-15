'use strict';

var gulp = require('gulp');
var browsersync = require('browser-sync');
var settings = require('../../config/settings');
var config = {
  browsersync: require('../../config/browsersync')
};

function task () {
  browsersync(config.browsersync);
}

gulp.task('server', [settings.proxy ? 'nodemon' : null],  task);

module.exports = task;
