'use strict';

const join = require('url-join');
const paths = require('../config/paths');
const {readFile, writeFileSync} = require('fs');

const WebpackManifest = function (opts) {
  this.opts = opts;
};

WebpackManifest.prototype.apply = function (compiler) {
  const {publicPath} = this.opts;

  compiler.plugin('done', (stats) => {
    readFile(paths.manifests.revision, 'utf8', (err, data) => {
      if (err) {
        return;
      }

      const statsJson = stats.toJson();
      const chunks = statsJson.assetsByChunkName;
      const existingData = JSON.parse(data);
      const manifest = {
      };

      for (const key in chunks) {
        if (chunks.hasOwnProperty(key)) {
          if (process.env.CDN && paths.dest.cdn) {
            manifest[join(publicPath, `${key}.js`)] = join(paths.dest.cdn, publicPath, chunks[key]);
          } else {
            manifest[join(publicPath, `${key}.js`)] = join(publicPath, chunks[key]);
          }
        }
      }

      writeFileSync(
        paths.manifests.revision,
        JSON.stringify(Object.assign(existingData, manifest), null, '\t')
      );
    });
  });
};

module.exports = WebpackManifest;
