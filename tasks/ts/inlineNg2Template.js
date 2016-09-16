'use strict';

var inlineNg2Template = require('gulp-inline-ng2-template/parser');
var through = require('through2');
var config = {
  inlineNg2Template: require('../../config/inlineNg2Template')
};

module.exports = function (file) {
  return through(function (buf, enc, next) {
    var ctx = this;

    inlineNg2Template({
      contents: buf,
      path: file
    }, config.inlineNg2Template)(function (err, result) {
      ctx.push(result);
      process.nextTick(next);
    });
  });
};
