'use strict';

var webpack = require('webpack');
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
  }
};

// Typescript loader
if (settings.scripting === 'ts') {
  config.module.loaders.push({
    test: /\.ts$/,
    loaders: ['ts-loader', settings.angular2 ? 'angular2-template-loader' : null] // Use angular2-template-loader for angular 2 inline templates
  });
}

if (process.env.NODE_ENV === 'development') {
  // Watch and add sourcemaps whilst developing
  config.watch = true;
  config.devtool = 'inline-source-map';
} else {
  // Uglify for production builds
  config.plugins = [
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      comments: false
    })
  ]
}

module.exports = config;
