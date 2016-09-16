'use strict';

var path = require('path');
var _ = require('lodash');
var config = require(path.resolve('./gulp.config.js')).paths;

var defaults = {
  src: {
    copy: path.resolve('./src/client/copy/**/*'),
    favicons: {
      icon: path.resolve('./src/client/favicons/favicon.+(gif|jpg|jpeg|png)'),
      output: path.resolve('./src/client/html/partials/favicons.html')
    },
    fonts: path.resolve('./src/client/fonts/**/*.+(eot|woff2|woff|ttf|svg)'),
    icons: path.resolve('./src/client/icons/**/*.svg'),
    images: path.resolve('./src/client/img/**/*.+(gif|jpg|jpeg|png)'),
    js: {
      entry: path.resolve('./src/client/js/index.js'),
      scripts: path.resolve('./src/client/js/**/*.js')
    },
    packages: {
      bower_components: path.resolve('./bower_components'),
      node_modules: path.resolve('./node_modules')
    },
    sass: path.resolve('./src/client/scss/**/*.+(scss|sass)'),
    server: {
      dir: path.resolve('./src/server/**/*'),
      js: path.resolve('./src/server/index.js'),
      ts: path.resolve('./src/server/index.ts')
    },
    templates: {
      data: path.resolve('./src/client/html/data/global.json'),
      pages: path.resolve('./src/client/html/pages/**/*.html'),
      root: path.resolve('./src/client/html')
    },
    ts: {
      entry: [
        path.resolve('./src/client/ts/index.ts'),
        path.resolve('./typings/index.d.ts')
      ],
      scripts: path.resolve('./src/client/ts/**/*.ts')
    }
  },
  dest: {
    base: path.resolve('./dist/client'),
    css: path.resolve('./dist/client/assets/css'),
    favicons: path.resolve('./dist/client/assets/favicons'),
    fonts: path.resolve('./dist/client/assets/fonts'),
    images: path.resolve('./dist/client/assets/img'),
    js: path.resolve('./dist/client/assets/js'),
    server: {
      entry: path.resolve('./dist/server/index.js'),
      root: path.resolve('./dist/server')
    }
  },
  reports: {
    js: path.resolve('./reports/js/checkstyle.xml'),
    sass: path.resolve('./reports/sass/checkstyle.xml'),
    ts: path.resolve('./reports/ts/checkstyle.xml')
  },
  lint: {
    js: path.resolve(__dirname, '../linting/.eslintrc'),
    sass: path.resolve(__dirname, '../linting/.scss-lint.yml'),
    ts: path.resolve(__dirname, '../linting/tslint.json')
  }
};

module.exports = _.defaultsDeep(config, defaults);
