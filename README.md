# gulp-starter
## Getting started
Create a `gulpfile.js` file in the root of your project with the following;

```javascript
var gulp = require('gulp-starter');

return gulp;
```

## Configuration
By default gulp-starter defines these settings, which you can overwrite in `gulp.config.js` file in the root of your project:

An example config file looks like so:

```javascript
'use strict';

module.exports = {
  settings: {
    ... overwritten settings go here
  },
  paths: {
    ... overwritten paths go here
  }
};
```

### Settings
#### angular1
Type: `boolean`
Default: `false`

Set this to `true` if you are building an Angular JS application

#### angular2
Type: `boolean`
Default: `false`

Set this `true` if you are building an Angular 2 application. You MUST set the `scripting` setting to `ts`.

#### htmlmin
Type: `boolean`
Default: `false`

Set this to `true` if you want to minify html on production builds.

#### scripting
Type: `string`
Default: `js`

Tells gulp-starter what you will be using for clientside scripting. By default it is regular JavaScript, however, you can change it to `es6` or `ts` to use ES6 or TypeScript. This setting must be set to `ts` if you plan to use Angular 2.

#### uncss
Type: `boolean`
Default: `false`

Setting this to `true` will run UnCSS against your pages and remove any unused styles from your stylesheet(s). This will only work with static sites and not Angular apps. Use with caution as it may remove styles that it shouldn't.

### Paths
The default paths might not be fully suited to your particular project, so you can update them to whatever you wish. The default paths are as follows;

```javascript
config: {
  karma: './karma.conf.js',
  protractor: './protractor.conf.js'
},
src: {
  copy: './src/copy/**/*.*',
  favicons: {
    icon: './src/favicons/favicon.+(gif|jpg|jpeg|png)',
    output: './src/html/partials/favicons.html'
  },
  fonts: './src/fonts/**/*.+(eot|woff2|woff|ttf|svg)',
  icons: './src/icons/**/*.svg',
  images: './src/img/**/*.+(gif|jpg|jpeg|png)',
  js: {
    entry: {
      app: './src/js/index.js'
    },
    e2e: './src/js/**/*.e2e-spec.js',
    scripts: './src/js/**/*.js',
    unit: './src/js/**/*.spec.js',
    watch: './src/js/**/*'
  },
  packages: {
    bower_components: './bower_components',
    node_modules: './node_modules'
  },
  sass: './src/scss/**/*.+(scss|sass)',
  templates: {
    data: './src/html/data/global.json',
    pages: './src/html/pages/**/*.html',
    root: './src/html'
  },
  ts: {
    entry: {
      app: './src/ts/index.ts'
    },
    e2e: './src/ts/**/*.e2e-spec.ts',
    scripts: './src/ts/**/*.ts',
    unit: './src/ts/**/*.spec.ts',
    watch: './src/ts/**/*'
  }
},
dest: {
  base: './dist',
  css: './dist/assets/css',
  favicons: './dist/assets/favicons',
  fonts: './dist/assets/fonts',
  images: './dist/assets/img',
  js: './dist/assets/js'
},
reports: {
  js: './reports/js/checkstyle.xml',
  sass: './reports/sass/checkstyle.xml',
  ts: './reports/ts/checkstyle.xml'
},
lint: {
  js: __dirname, '../linting/.eslintrc',
  sass: __dirname, '../linting/.scss-lint.yml',
  ts: __dirname, '../linting/tslint.json'
}
```

## Task list
gulp-starter comes with the following tasks;

### default
The default task will run the `build`, `watch` and `server` tasks in that order

### build
Builds all assets. Set `NODE_ENV` to `production` ready code that is minified and has no sourcemaps. Setting to `development` ensures those assets aren't minified and sourcemaps are present for easier debugging

### clean
Deletes all build artifacts

### copy
Copies everything in your `src/copy` folder to your `dist` folder

### favicons
Generates a wide range of favicons based on a single image in your `src/favicons` folder. It will also output the relevant html tags in your `src/html/partials/favicons.html` file so that you don't have to manually add references to your html.

### fonts
Copies any font files in your `src/fonts` folder to the `dist/assets/fonts` folder.

### icons
Generates an icon font using `.svg` assets in the `src/icons` folder. The generated fonts will be placed in the `dist/assets/fonts` folder and a scss stylesheet containing all the icon font classes in `src/scss/components/_icons.scss`

### images
This minifies any images in the `src/images` directory.

### karma
Runs Angular unit tests using Karma task runner. `NODE_ENV` must be set to `test`

### protractor
Runs Protractor tests on angular apps. `NODE_ENV` must be set to `test`

### scripts
Uses Webpack to bundle JavaScript. Task will watch for changes if `NODE_ENV` is set to `development` and output will be minified if `NODE_ENV` is set to `production`

#### scripts:eslint
Runs eslint against JavaScript code. Only runs if `scripting` is set to `js` or `es6`

#### scripts:tslint
Runs tslint against TypeScript code. Only runs if `scripting` is set to `ts`

### scss
Compiles Sass into usable CSS

#### scss:lint
Lints SCSS using `sass-lint`.

### server
Runs `BrowserSync` development server.

### templates
Compiles `Nunjucks` templates into usable HTML.

### watch
Runs watch tasks to re-run build tasks on file change.

## Recommended npm scripts
To make life easier, add these scripts to the scripts section of your `package.json` file

```json
"scripts": {
  "start": "NODE_ENV=development gulp",
  "start-production": "NODE_ENV=production gulp",
  "build": "NODE_ENV=production gulp build"
}
```
