'use strict';

const {obj} = require('through2');
const join = require('url-join');
const paths = require('../config/paths');

module.exports = obj((file, enc, cb) => {
  if (file.isNull()) {
    return cb(null, file);
  }

  const manifest = JSON.parse(file.contents.toString());

  for (const item in manifest) {
    if (manifest.hasOwnProperty(item)) {
      if (!manifest[item].startsWith(paths.dest.cdn)) {
        manifest[item] = join(paths.dest.cdn, manifest[item]);
      }
    }
  }

  file.contents = new Buffer(JSON.stringify(manifest, null, '\t'), 'utf8');

  return cb(null, file);
});
