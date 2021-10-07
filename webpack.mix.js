const path = require('path');
const mix = require('laravel-mix');
const fs = require('fs-extra');
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
const ejsMix = (filePath) => {
	if (process.env.NODE_ENV === 'production') {
		return filePath + '?id=' + clearStr;
	}
	return filePath;
};

const srcPath = 'resources/';
const distPath = 'public/';

mix
	.ejs(
		`${srcPath}views/**/*.ejs`,
		distPath,
		{
			mix: ejsMix,
		},
		{
			root: `${srcPath}views`,
			base: `${srcPath}views`,
			partials: `${srcPath}views/partials`,
		},
	)
	// [polyfill](https://laravel-mix.com/extensions/polyfill)
	.polyfill()

	// javascript
	.js(`${srcPath}js/app.js`, `${distPath}assets/js/`)
	.eslint()

	// Scss
	.sass(`${srcPath}scss/style.scss`, `${distPath}/assets/css/`)
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
				files: [`${srcPath}**/*.scss`],
				configFile: path.join(__dirname, '.stylelintrc.js'),
				syntax: 'scss',
			}),
		],
	})

	.sourceMaps(false, 'inline-cheap-module-source-map') // cssのマップを出力ファイルに追記する形で用意する
	.copy(`${srcPath}images/`, `${distPath}assets/images`)
	// browserSync
	// URL: https://browsersync.io/docs/options/
	.browserSync({
		files: `${distPath}**/*`,
		server: distPath,
		proxy: false,
	});
