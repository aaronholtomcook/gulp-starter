'use strict';

var webpack = require('webpack');
var NgAnnotatePlugin = require('ng-annotate-webpack-plugin');
var settings = require('./settings');

var config = {
  output: {
    filename: 'app.js'
  },
  resolve: {
    extensions: ['', '.js', '.ts']
  },
  module: {
    loaders: [{
      test: /\.html$/,
      loader: 'html'
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
};

// Typescript loader
if (settings.scripting === 'ts') {
  config.module.loaders.push({
    test: /\.ts$/,
    loaders: ['ts-loader', settings.angular2 ? 'angular2-template-loader' : null] // Use angular2-template-loader for angular 2 inline templates
  });
}

// Babel loader for ES6
if (settings.scripting === 'es6') {
  config.module.loaders.push({
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'babel',
    query: {
      presets: ['es2015']
    }
  });
}

// ng-annotate + template loader for angular 1
if (settings.angular1) {
  config.plugins.push(new NgAnnotatePlugin());
  // config.module.loaders.push({
  //
  // });
}

if (process.env.NODE_ENV === 'development') {
  // Watch and add sourcemaps whilst developing
  config.watch = true;
  config.devtool = 'inline-source-map';
} else {
  // Uglify for production builds
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    mangle: {
      keep_fnames: true
    },
    comments: false
  }));

  // No errors
  config.plugins.push(new webpack.NoErrorsPlugin());
}

module.exports = config;
