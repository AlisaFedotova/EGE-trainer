const Handlebars = require('handlebars');
const path = require('path');


module.exports = {
    entry: __dirname + "/src/index.js",// webpack entry point. Module to start building dependency graph
    output: {
        path: __dirname + '/build', // Folder to store generated bundle
        filename: '[name].js',  // Name of generated bundle after build
        publicPath: '/' // public URL of the output directory when referenced in a browser
    },
    node: {
        fs: 'empty'
    },
    module: {
        rules: [
            {
                test: /\.hbs$/,
                use: [{
                    loader: "handlebars-loader",
                    options: {helperDirs: path.resolve(__dirname, "./js/helpers")}
                }]
            }
        ]
    },
};