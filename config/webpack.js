'use strict';

var path = require('path');
var webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');
var paths = require('./paths');
var settings = require('./settings');
var WebpackManifest = require('../utilities/webpackManifest');
var scripting = settings.scripting === 'ts' ? 'ts' : 'js';
var root = paths.src[scripting].watch.replace('/**/*', '');
var publicPath = paths.dest.js.replace(paths.dest.base + '/', '');

var config = {
  resolve: {
    extensions: ['', '.js', '.ts'],
    root: root
  },
  module: {
    loaders: []
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
};

if (process.env.NODE_ENV === 'test') {
  // Make sure output plays nice with Istanbul
  config.module.postLoaders = [{
    test: /\.(js|ts)$/,
    loader: 'istanbul-instrumenter-loader',
    include: root,
    exclude: [
      /\.(e2e-spec|spec|mock)\.ts$/,
      /bower_components/,
      /node_modules/
    ]
  }];
} else {
  // Set entry point and output if we're not testing
  config.entry = paths.src[scripting].entry;
  config.output = {
    filename: process.env.NODE_ENV === 'production' ? '[name]-[hash].js' : '[name].js',
    publicPath: path.join(publicPath, '/')
  };

  // Grab entry point names and determine if we need to dedupe
  var entry = [];

  for (var name in paths.src[scripting].entry) {
    if (paths.src[scripting].entry.hasOwnProperty(name)) {
      entry.push(name);
    }
  }

  // Dedupe if multiple entry points are being used
  if (entry.length > 1) {
    config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
      name: entry
    }));
  }
}

// Scripting specific options
if (settings.scripting === 'ts') {
  var atLoaderOpts;

  if (process.env.NODE_ENV === 'test') {
    atLoaderOpts = 'awesome-typescript-loader?sourceMap=false,inlineSourceMap=true';
  } else {
    atLoaderOpts = 'awesome-typescript-loader';
  }

  // Typescript loader
  config.module.loaders.push({
    test: /\.ts$/,
    loaders: settings.angular2 ? [atLoaderOpts, 'angular2-template-loader', 'angular-router-loader'] : [atLoaderOpts], // Use angular2-template-loader for angular 2 inline templates
    exclude: [
      /\.e2e-spec\.ts$/
    ]
  });
} else if (settings.scripting === 'es6') {
  // Babel loader for ES6
  config.module.loaders.push({
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'babel-loader',
    query: {
      presets: ['es2015']
    }
  });
}

// Angular specific options
if (settings.angular1) {
  // ng-annotate + template loader for angular 1
  config.module.loaders.push({
    test: /\.js$/,
    loader: 'ng-annotate-loader'
  });
  config.module.loaders.push({
    test: /\.html$/,
    loader: 'ngtemplate-loader?relativeTo=' + root + '/!html'
  });
} else if (settings.angular2) {
  // Template loader for angular 2
  config.module.loaders.push({
    test: /\.html$/,
    loader: 'html-loader'
  });
  config.htmlLoader = {
    caseSensitive: true,
    minimize: true,
    removeAttributeQuotes: false
  };
}

// Environment options
if (process.env.NODE_ENV === 'development') {
  // Watch and add sourcemaps whilst developing
  config.watch = true;
  config.devtool = 'inline-source-map';
} else if (process.env.NODE_ENV === 'test') {
  // Configure for testing
  config.devtool = 'inline-source-map';
} else {
  // Replace references from the rev manifest
  config.plugins.push(
    new ManifestPlugin({
      fileName: paths.src.templates.manifest
    })
  );
  
  // Add to rev manifest
  config.plugins.push(
    new WebpackManifest({
      publicPath: publicPath
    })
  );

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
