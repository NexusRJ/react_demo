var path=require('path');
module.exports = {
    entry: ["whatwg-fetch", "./index.js"],
    output: {
        path: './build',
        filename: "bundle.js"
    },
    devtool: 'cheap-module-eval-source-map',
    module: {
        loaders: [
            {test: /\.css$/, loader: "style!css"},
            {
                test: /\.js|jsx$/, 
                exclude: /node_modules/,
                loader: 'babel',
                query: {presets: ['es2015', 'stage-0', 'react']}
            }
        ]
    }
};
