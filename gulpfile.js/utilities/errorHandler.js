/* eslint-disable prefer-rest-params */

'use strict';

const notify = require('gulp-notify');

module.exports = function (errorObject) {
  notify
    .onError(
      errorObject.toString()
        .split(': ')
        .join(':\n')
    )
    .apply(this, arguments);

  if (typeof this.emit === 'function') {
    this.emit('end');
  }
};
