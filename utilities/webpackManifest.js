'use strict';

var paths = require('../config/paths');
var path = require('path');
var fs = require('fs');

module.exports = function (publicPath, destination) {
  return function () {
    this.plugin('done', function (stats) {
      var statsJson = stats.toJson();
      var chunks = statsJson.assetsByChunkName;
      var manifest = {};

      for (var key in chunks) {
        if (chunks.hasOwnProperty(key)) {
          var originalFilename = key + '.js';

          manifest[path.join(publicPath, originalFilename)] = path.join(publicPath, chunks[key]);
        }
      }

      fs.writeFileSync(
        path.join(process.cwd(), destination, paths.src.templates.manifest),
        JSON.stringify(manifest)
      );
    });
  };
};
