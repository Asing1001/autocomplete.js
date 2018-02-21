const path = require('path');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/dist/",
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                exclude: "/node_modules/",
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: ['stage-0']
                    }
                }]
            }
        ]
    },
    devServer: {
        open: true,
    },
    plugins: [

    ]
};