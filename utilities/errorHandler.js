/* eslint-disable prefer-rest-params */

'use strict';

const notify = require('gulp-notify');
const plumber = require('gulp-plumber');

module.exports = () => plumber((error) => notify.onError(() => error));
