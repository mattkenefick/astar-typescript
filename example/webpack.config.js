const path = require('path');

// Copy files or entire directories, which already exist, to the build folder
const CopyPlugin = require('copy-webpack-plugin');

// Simplify creation of HTML files to serve your webpack bundles
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/game.ts',
	output: {
		path: path.resolve(__dirname, 'dist'),
		// It is generally better to use [chunkhash] in the filename instead of a
		// fixed filename, especially in production builds.
		// When you use a fixed filename, the browser may cache the file and reuse
		// it even if you make updates to your code. This means that users may not
		// see the updated code until they clear their cache, which can lead to
		// confusion and errors.
		// By using [chunkhash] in the filename, webpack will generate a unique hash
		// for each chunk based on its contents. When the contents of a chunk change,
		// the hash value changes, resulting in a new filename.
		filename: '[name].[chunkhash].js',
		chunkFilename: '[name].[chunkhash].js',
		// Remove all files in the output directory that are not generated by the
		// current build
		clean: true
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				include: path.resolve(__dirname, 'src'),
				loader: 'ts-loader'
			},
			{
				test: require.resolve('Phaser'),
				loader: 'expose-loader',
				options: { exposes: { globalName: 'Phaser', override: true } }
			}
		]
	},
	devServer: {
		static: path.join(__dirname, 'dist')
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	// The SplitChunksPlugin is a built-in plugin in webpack that helps to split
	// your code into separate chunks, which can improve the performance of your
	// application by reducing the size of each individual bundle.
	optimization: {
		splitChunks: {
			chunks: 'all'
		}
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{
					from: 'src/assets/',
					to: 'assets/'
				}
			]
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src/index.html'),
			filename: 'index.html',
			title: 'astar-typescript-example',
			inject: 'head'
		})
	]
};
