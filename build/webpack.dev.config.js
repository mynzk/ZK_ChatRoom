const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')

module.exports = {
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Chat For Github',
			favicon: './favicon.png',
			template: './assets/template/index.ejs',
		}),
		new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('dev')})
	]
}
