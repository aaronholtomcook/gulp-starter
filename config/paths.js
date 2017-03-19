'use strict';

const {resolve} = require('path');
const settings = require('./settings');
const config = require('../utilities/config');
const {dist, reports, src, temp} = require('../utilities/paths');

const defaults = {
  config: {
    webpack: resolve('./webpack.config.js')
  },
  dest: {
    assets: dist('assets'),
    base: dist(),
    css: dist('assets/css'),
    favicons: dist('assets/favicons'),
    fonts: dist('assets/fonts'),
    images: dist('assets/img'),
    js: dist('assets/js')
  },
  lint: {
    js: resolve(__dirname, '../linting/.eslintrc'),
    sass: resolve(__dirname, '../linting/.sass-lint.yml'),
    ts: resolve(__dirname, '../linting/tslint.json')
  },
  manifests: {
    revision: temp('rev-manifest.json')
  },
  reports: {
    js: reports('js/checkstyle.xml'),
    sass: reports('sass/checkstyle.xml'),
    ts: reports('ts/checkstyle.xml')
  },
  server: {
    app: resolve(__dirname, '../utilities/app.js'),
    run: resolve(__dirname, '../utilities/server.js')
  },
  src: {
    copy: src('copy/**/*.*'),
    favicons: {
      icon: src('favicons/favicon.png'),
      output: src('html/partials/favicons.html')
    },
    fonts: src('fonts/**/*.{eot,woff2,woff,ttf,svg}'),
    icons: {
      stylesheet: src('scss/components'),
      svg: src('icons/**/*.svg'),
      template: resolve(__dirname, '../templates/_icons.scss')
    },
    images: src('img/**/*.{gif,jpg,jpeg,png,svg}'),
    packages: {
      npm: resolve('./node_modules')
    },
    sass: src('scss/**/*.{scss,sass}'),
    scripts: src(`${settings.scripting}/**/*.${settings.scripting}`),
    templates: {
      data: src('html/data/global.json'),
      pages: src('html/pages/**/*.html'),
      root: src('html')
    }
  },
  temp: temp()
};

module.exports = config(defaults, 'paths');
