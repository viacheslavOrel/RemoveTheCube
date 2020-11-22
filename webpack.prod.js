const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const miniCss = require('mini-css-extract-plugin');

module.exports = {
    mode: 'production',
    entry: './src/app.js',

    plugins: [
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new miniCss({
            filename: 'style.css',
         }),
    ],

    module: {
        rules: [{
            test: /\.(s*)css$/,
            use: [
                miniCss.loader,
                'css-loader',
                'sass-loader',
            ]
        },
        {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: [
                        '@babel/plugin-proposal-class-properties',
                        "@babel/plugin-proposal-private-methods"
                    ]
                }
            }
        }
        ]
    },

    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'prod'),
    },
}