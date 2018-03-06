const path = require('path');

const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = new Promise(function (resolve) {
	const rules = [];
	const plugins = [];
	glob(path.resolve(__dirname, 'styles/themes/*.pcss'), function(er, files) {
		files.forEach(function(file) {
			const filename = file.substring(file.lastIndexOf('/') + 1, file.lastIndexOf('.pcss'));
			const plugin = new ExtractTextPlugin(filename + '.css');
			plugins.push(plugin);
			rules.push({
				test: new RegExp(filename + '\.pcss$'),
				exclude: /node_modules/,
				use: plugin.extract([ 'css-loader', 'postcss-loader' ])
			});
		});

		plugins.push(new HtmlWebpackPlugin({ template: './template.html' }));

		resolve({
			entry: './index.js',
			devServer: {
				contentBase: path.resolve(__dirname, 'dist'),
				compress: false,
				port: 9000
			},
			module: {
				rules: rules
			},
			output: {
				path: path.resolve(__dirname, 'dist'),
				filename: 'bundle.js'
			},
			plugins: plugins
		});
	});
});

module.exports = config;