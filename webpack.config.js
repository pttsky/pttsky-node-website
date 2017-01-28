module.exports = {
    entry: './public/javascript/src/waves.js',
    output: {
        path: './public/javascript/dist',
        filename: 'oscring.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
}