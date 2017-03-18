'use strict';

const express = require('express');
const paths = require('../config/paths');

const app = express();

app.use('/', express.static(paths.dest.base));

module.exports = app;
