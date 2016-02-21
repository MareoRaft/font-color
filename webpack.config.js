var webpack = require("webpack")

module.exports = {
	entry: "./main.js",
	output: {
		path: __dirname,
		filename: "bundle.js",
	},
	module: {
		preLoaders: [
			{
				test: /\.js$/,
				loader: "source-map-loader" // very helpful, but should be disabled for production.
			}
		],
		loaders: [
			{ test: /\.css$/, loader: "style!css" },
		]
	},
	plugins: [
	],
}

