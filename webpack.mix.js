let mix = require('laravel-mix');
let fs = require('fs-extra');
require('laravel-mix-polyfill');
require('laravel-mix-ejs');
require('laravel-mix-eslint');
require('laravel-mix-stylelint');

const styleLintPlugin = require('stylelint-webpack-plugin');

// 初期化
fs.removeSync(`public/`);

mix
.ejs('resources/views/**/*.ejs', 'public',{},{
  root: 'resources/views',
  base: 'resources/views',
  partials: 'resources/views/partials'
})
// [polyfill](https://laravel-mix.com/extensions/polyfill)
.polyfill({})

// javascript
.js('resources/js/app.js', 'public/assets/js/')
.eslint()

// Scss
.sass('resources/scss/style.scss', 'public/assets/css/')
.options({
    processCssUrls: false,
  }
)
.webpackConfig({
  plugins: [
      new styleLintPlugin({
          files: ['**/*.scss'],
          configFile: path.join(__dirname, '.stylelintrc.js'),
          syntax: 'scss'
      })
  ]
})

// browserSync
// URL: https://browsersync.io/docs/options/
.browserSync(
  {
    files: 'public/**/*',
    server: 'public',
    proxy: false
  }
);