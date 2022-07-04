'use strict';

// core 
const webpack = require('webpack');
// lib
const path = require('path');
// plugin
const SpritesmithPlugin = require('webpack-spritesmith');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const LiveReloadPlugin = require('webpack-livereload-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

//---- GENERATOR

const pluginGenerator = (options, dir, fileNames = [], spriteGroups = []) => {
	const commonPlugin = [
		new LiveReloadPlugin(),
		new webpack.ProvidePlugin({
			'$': 'jquery',
			'THREE': 'three'
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			}
		}),
		new MiniCssExtractPlugin({
			filename: `${dir}.css`,
			ignoreOrder: false
		}),
		new CleanWebpackPlugin({
			cleanStaleWebpackAssets: false,
		}),
	];

	spriteGroups.forEach(group => {
		commonPlugin.push(makeSprite(dir, group))
	});

	let customPlugin = [
		...commonPlugin,
		new CopyWebpackPlugin([
			{
				from: `src/${dir}/assets`,
				to: `assets`,
				logLevel: 'debug',
				force: true,
			}
		])
	];

	fileNames.forEach(fileName => {
		customPlugin.push(
			new HtmlWebpackPlugin({
				filename: `${fileName}.html`,
				template: `src/${dir}/html/${fileName}.html.twig`
			})
		)
	})

	// customPlugin.push(
	// 	new BundleAnalyzerPlugin()
	// );

	return customPlugin;
}

// LOADER

const makeSprite = (pathRoot, pathSprite) => new SpritesmithPlugin({
	src: {
		cwd: path.resolve(__dirname, 'src/' + pathRoot + '/sprites', pathSprite),
		glob: '*.{jpg,png}'
	},
	target: {
		image: path.resolve(__dirname, 'src/' + pathRoot + '/assets', '_sprites-' + pathSprite + '.png'),
		css: path.resolve(__dirname, 'src/' + pathRoot + '/scss/sprites', '_sprites-' + pathSprite + '.scss')
	},
	apiOptions: {
		cssImageRef: '../assets/_sprites-' + pathSprite + '.png'
	},
	spritesmithOptions: {
		padding: 2
	}
});

const styleLoader = (pathRoot) => {
	return {
		test: /\.(sa|sc|c)ss$/,
		use: [
			{
				loader: MiniCssExtractPlugin.loader,
				options: {
					publicPath: `../${pathRoot}`,
				},
			},
			{
				loader: 'css-loader',
				options: {
					sourceMap: true
				}
			},
			{
				loader: "postcss-loader",
				options: {
					postcssOptions: {
						plugins: [
							require('autoprefixer')
						]
					},
					sourceMap: true
				},
			},
			{
				loader: 'sass-loader',
				options: {
					sourceMap: true
				}
			}
		]
	}
};

const fileLoader = (pathRoot) => {
	return {
		test: /\.(svg|png|jpe?g|gif|mp4|otf|eot|ttf|woff|woff2)$/,
		use: [
			{
				loader: 'url-loader',
				options: {
					limit: false,
					name: '[path][name].[ext]',
					publicPath: (_, resourcePath, __) => {
						//   console.log(_, resourcePath, __);
						return 'assets/' + resourcePath.replace(/[\\]/g, "/").replace(/^(.*?)(assets\/)/g, "");
					},
					outputPath: (_, resourcePath, __) => {
						//   console.log(_, resourcePath, __);
						return 'assets/' + resourcePath.replace(/[\\]/g, "/").replace(/^(.*?)(assets)/g, "");
					}
				}
			}
		]
	}
}

const scriptLoader = (pathRoot) => {
	return {
		test: /\.js$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader'
		}
	}
}

const twigLoader = _ => {
	return {
		test: /\.twig$/,
		use: [{
			loader: 'twig-loader',
			options: {}
		}]
	}
}

const jQueryLoader = _ => {
	return {
		test: require.resolve('jquery'),
		use: [{
			loader: 'expose-loader',
			options: {
				exposes: 'jQuery'
			}
		}, {
			loader: 'expose-loader',
			options: {
				exposes: '$'
			}
		}]
	};
};

module.exports = {
	configGenerator: (options, dir, fileNames = [], spriteGroups = []) => {
		// console.log(options, dir, fileNames, spriteGroups);
		return {
			name: dir,
			entry: [`./src/${dir}/index.js`],
			devtool: options.mode === "production" ? '' : 'source-map',
			output: {
				filename: `${dir}.bundle.js`,
				path: path.resolve(__dirname, `${dir}`),
				publicPath: ``
			},
			stats: 'minimal',
			module: {
				rules: [
					fileLoader(dir),
					twigLoader(dir),
					scriptLoader(dir),
					styleLoader(dir),
					jQueryLoader(dir)
				]
			},
			optimization: {
				splitChunks: {
					cacheGroups: {
						commons: {
							test: /[\\/]node_modules[\\/]/,
							name: '0',
							chunks: 'all'
						}
					}
				}
			},
			resolve: {
				alias: {
					three$: 'three/build/three.min.js', 
					'three/.*$': 'three',
				},
			},
			plugins: pluginGenerator(options, dir, fileNames, spriteGroups),
			node: {
				fs: "empty"
			}
		}
	}
};