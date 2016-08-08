module.exports = {
    entry: "./index.js",
    output: {
        path : './build',
        filename : "bundle.js"
    },
    module : {
        loaders : [
            {test : /\.css$/, loaders:["style", "css"]},
            {
                test : /\.js|jsx$/, 
                loaders: ['babel'],
                query: {
                    presets: ["react"]
                }
            }
        ]
    }
};
