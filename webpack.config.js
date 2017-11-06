/**
 * Created by zhanglongyu on 2017/9/15.
 */
let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        index: path.resolve(__dirname, 'src', 'scripts', 'index.js'),
        //second: path.resolve(__dirname, 'src', 'scripts', 'second.js'),  //多个页面添加入口
    },
    output: {
        filename: 'scripts/[name]-[hash].js',
        chunkFilename: "scripts/[name].chunk.js",
        path: path.resolve(__dirname, 'dist'),
        /*publicPath: "/dist/"*/
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /^node_modules$/,
                include: path.resolve(__dirname, 'src', 'scripts')
            },
            {
                test: /\.(scss|css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','sass-loader']
                }),
                exclude: /^node_modules$/,
                include: path.resolve(__dirname, 'src', 'styles')
            },
          /*{
                test: /\.scss$/,
                exclude: /^node_modules$/,
                loader: ExtractTextPlugin.extract('style', ['css', 'autoprefixer', 'sass']),
                include: [APP_PATH]
            }*/
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                exclude: /^node_modules$/,
                query: {
                    limit: 10000,
                    name: 'img/[name].[hash:8].[ext]'
                }
            }
        ]
    },
    plugins: [
       new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false, // remove all comments
            },
            compress: {
                warnings: false
            }
        })
        new ExtractTextPlugin({
            filename: './styles/[name].css',
        }),  //单独打包css
        new CopyWebpackPlugin([{    //合并static文件下文件
            from: path.resolve(__dirname, 'static'),
            to: path.resolve(__dirname, 'dist', 'static'),
            ignore: ['.*']
        }]),
        new HtmlWebpackPlugin({
            filename: './views/index.html',
            template: path.resolve(__dirname, 'src', 'views', 'index.html'),
            inject: 'body',
            hash: true,
            chunks: ['index'],
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        }),
        /*new HtmlWebpackPlugin({  //多个页面添加入口
            filename: './views/second.html',
            template: path.resolve(__dirname, 'src', 'views', 'second.html'),
            inject: 'body',
            hash: true,
            chunks: ['second'],
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        })*/
    ]
};
