let path = require('path');
let mix = require('laravel-mix');
let fs = require('fs-extra');
require('laravel-mix-polyfill');
require('laravel-mix-ejs');
require('laravel-mix-eslint');
require('laravel-mix-stylelint');

const styleLintPlugin = require('stylelint-webpack-plugin');

// 初期化
fs.removeSync(`public/`);

/**
 * 乱数生成
 */
let getRandomStr = () => {
	let base = 'abcdefghijklmnopqrstuvwxyz0123456789'; // 使用する文字列
	let num = 16; // 乱数の長さ
	return Array.from(Array(num))
		.map(() => base[Math.floor(Math.random() * base.length)])
		.join('');
};
const clearStr = getRandomStr(); // キャッシュクリア パラメーター用

/**
 * ファイル管理用
 *
 * @param {*} filePath
 */
let ejsMix = (filePath) => {
	if (process.env.NODE_ENV === 'production') {
		return filePath + '?id=' + clearStr;
	}
	return filePath;
};

mix
	.ejs(
		'resources/views/**/*.ejs',
		'public',
		{
			mix: ejsMix,
		},
		{
			root: 'resources/views',
			base: 'resources/views',
			partials: 'resources/views/partials',
		},
	)
	// [polyfill](https://laravel-mix.com/extensions/polyfill)
	.polyfill({})

	// javascript
	.js('resources/js/app.js', 'public/assets/js/')
	.eslint()

	// Scss
	.sass('resources/scss/style.scss', 'public/assets/css/')
	.options({
		processCssUrls: false,
		postCss: [
			require('autoprefixer')({
				grid: 'autoplace',
			}),
		],
	})
	.webpackConfig({
		plugins: [
			new styleLintPlugin({
				files: ['resources/**/*.scss'],
				configFile: path.join(__dirname, '.stylelintrc.js'),
				syntax: 'scss',
			}),
		],
	})

	.sourceMaps(false, 'inline-cheap-module-source-map') // cssのマップを出力ファイルに追記する形で用意する
	.copy(`resources/images/`, `public/assets/images`)
	// browserSync
	// URL: https://browsersync.io/docs/options/
	.browserSync({
		files: 'public/**/*',
		server: 'public',
		proxy: false,
	});
