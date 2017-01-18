'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var config = {
  nodemon: require('../../config/nodemon')
};

function task (cb) {
  var started = false;

  return nodemon(config.nodemon).on('start', function () {
    if (!started) {
      cb();
      started = true;
    }
  });
}

gulp.task('nodemon', task);

module.exports = task;
