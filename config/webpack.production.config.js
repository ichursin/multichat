const path = require('./helpers/webpack.helpers');
const common = require('./webpack.common');
const merge = require('webpack-merge');

const NoErrorsPlugin = require('webpack/lib/NoErrorsPlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = merge(common, {
    devtool: null,
    plugins: [
        new NoErrorsPlugin(),

        new DedupePlugin(),

        new CopyWebpackPlugin([
            {
                from: path.root('src', 'public')
            }
        ]),

        new ExtractTextPlugin('[name].css'),

        new UglifyJsPlugin({
            sourceMap: false,
            beautify: false,

            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },

            compress: {
                warnings: false,
            },
            comments: false
        }),
    ]
});