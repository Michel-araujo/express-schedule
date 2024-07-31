const path = require('path')

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'frontend', 'assets', 'js', 'main.js'),
    output: {
        path: path.resolve(__dirname, 'public', 'assets'),
        filename: 'bandle.js'
    },
    devtool: 'source-map',
    module: {
        rules: [{
            exclude: /node_modules/,
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/env']
                }
            }
        }, {
            test: /\.(s(a|c)ss)$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        },]
    },
}