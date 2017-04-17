'use strict';

const notify = require('gulp-notify');
const plumber = require('gulp-plumber');

module.exports = () => plumber(function (error) {
  notify.onError({
    message: error.message,
    title: error.plugin
  })(error);

  if (typeof this.emit === 'function') {
    this.emit('end');
  }
});
