'use strict';

const webpack = require('webpack');
const helpers = require('./helpers/webpack.helpers');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');


module.exports = {
    entry: {
        'app': './src/app.js',
        'vendor': './src/vendor.js',
    },

    output: {
        path: helpers.root('public'),
        filename: '[name].js',
        chunkFilename: '[name].[hash].js',
    },

    devtool: 'cheap-inline-source-map',

    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: [
                    'ng-annotate',
                    'babel',
                ],
                include: [helpers.root('src'), helpers.root('node_modules', 'tmi.js')]
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader'),
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                loader: 'file'
            },
            {
                test: /\.html$/,
                loader: 'raw'
            }
        ],

        noParse: [
            /angular-websocket/
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/public/index.html',
            inject: 'body'
        }),

        new CommonsChunkPlugin({
            name: ['vendor']
        })
    ],

    node: {
        fs: 'empty',
        tls: 'empty'
    }
};