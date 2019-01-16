const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports = {
    devtool:'cheap-module-eval-source-map',
    mode: 'development',
    entry: {
        filename: './src/index.js'
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname ,'dist'),
        chunkFilename: 'js/[name].[chunkhash:8].chunk.js'
    },
    module: {
        rules: [
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test: /\.(png|jpeg|gif|svg|jpg)$/,
                use: [ 'url-loader']
            },

            {
                test: /\.styl$/, 
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    }, 'css-loader', 'stylus-loader'],
                 
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader?cacheDirectory'
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'react-project',
            template:'./index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[chunkhash:8].css",
            chunkFilename: "[name].chunk.[chunkhash:8].css"
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer : {
        contentBase: './dist',
        hot: true,
        port: 9000,
        historyApiFallback: true
    }
}