'use strict';

var webpack = require('webpack');
var path = require('path');
var paths = require('./paths');
var settings = require('./settings');
var AotPlugin = require('@ngtools/webpack').AotPlugin;
var scripting = settings.scripting === 'ts' ? 'ts' : 'js';
var root = paths.src[scripting].watch.replace('/**/*', '');

var config = {
  resolve: {
    extensions: [
      '.js',
      '.ts'
    ],
    modules: [
      'node_modules'
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      root, // location of your src
      {}
    )
  ],
  module: {
    rules: []
  }
};

if (process.env.NODE_ENV === 'test') {
  // Make sure output plays nice with Istanbul
  config.module.rules = [{
    enforce: 'post',
    test: /\.(js|ts)$/,
    loader: 'istanbul-instrumenter-loader',
    include: root,
    exclude: [
      /\.(e2e-spec|spec|mock)\.ts$/,
      /node_modules/
    ]
  }];
} else {
  // Set entry point and output if we're not testing
  config.entry = paths.src[scripting].entry;
  config.output = {
    filename: '[name].js'
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
  var ng2Loaders;

  if (process.env.NODE_ENV === 'test') {
    atLoaderOpts = 'awesome-typescript-loader?sourceMap=false,inlineSourceMap=true';
  } else {
    atLoaderOpts = 'awesome-typescript-loader';
  }

  if (process.env.NODE_ENV === 'production') {
    // Angular2 AOT compiling
    ng2Loaders = ['@ngtools/webpack', 'angular-router-loader?aot=true'];

    config.plugins.push(
      new AotPlugin({
        tsConfigPath: paths.config.ts,
        entryModule: path.resolve(root, 'app/app.module#AppModule'),
      })
    );
  } else {
    ng2Loaders = [atLoaderOpts, 'angular2-template-loader', 'angular-router-loader'];
  }

  // Typescript loader
  config.module.rules.push({
    test: /\.ts$/,
    loaders: settings.angular2 ? ng2Loaders : [atLoaderOpts], // Use angular2-template-loader for angular 2 inline templates
    exclude: [
      /\.e2e-spec\.ts$/
    ]
  });
} else if (settings.scripting === 'es6') {
  // Babel loader for ES6
  config.module.rules.push({
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
  config.module.rules.push({
    test: /\.js$/,
    loader: 'ng-annotate-loader'
  });
  config.module.rules.push({
    test: /\.html$/,
    loader: 'ngtemplate-loader?relativeTo=' + root + '/!html'
  });
} else if (settings.angular2) {
  // Template loader for angular 2
  config.module.rules.push({
    test: /\.html$/,
    loader: 'html-loader',
    query: {
      caseSensitive: true,
      minimize: true,
      removeAttributeQuotes: false
    }
  });
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
