const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
module.exports = {
	entry: {
		app: ["./src/app.js", hotMiddlewareScript]
	},
	output: {
		path: path.join(__dirname, "./dist/"),
		filename: "js/[name]_bundle.js",
		publicPath: "http://localhost:3000/"
	},
	resolve: {
		alias:{
			vue: "vue/dist/vue.js"
		}
	},
	module: {
		rules:[{
			test: /\.vue$/,
			use: "vue-loader"
		},{
			test: /\.css$/,
			use:["style-loader", "css-loader"]
		}]
	},
	plugins:[
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			chunk: ["app"]
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	]
}