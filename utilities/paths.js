'use strict';

const {join, resolve} = require('path');

exports.dist = (path = '') => join(resolve('./dist', path));

exports.reports = (path = '') => join(resolve('./reports', path));

exports.src = (path = '') => join(resolve('./src', path));

exports.temp = (path = '') => join(resolve('./tmp', path));
