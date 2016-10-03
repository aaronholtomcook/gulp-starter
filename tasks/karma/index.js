'use strict';

var gulp = require('gulp');
var Karma = require('karma').Server;
var config = {
  karma: require('../../config/karma')
};

function task (cb) {
  new Karma(config.karma, cb).start();
}

gulp.task('karma', task);

module.exports = task;
