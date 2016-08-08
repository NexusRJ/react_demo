module.exports = {
    entry: ["whatwg-fetch", "./index.js"]
    output: {
        path : './build',
        filename : "bundle.js"
    },
    module : {
        loaders : [
            {test : /\.css$/, loaders:["style", "css"]},
            {
                test : /\.js|jsx$/, 
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            }
        ]
    }
};
