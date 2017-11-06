'use strict';

const webpack = require('webpack');
const config = require('../utilities/config');

const defaults = webpack;

module.exports = config(defaults, 'webpack');
