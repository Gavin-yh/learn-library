const path = require("path")
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const smp = new SpeedMeasurePlugin();
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = smp.wrap({
    module: {
        // rules:[
        //     {
        //         test: /.js$/,
        //         use:{
        //             loader: path.resolve('./loader/index.js'),
        //             options:{
        //                 data: "苹果"
        //             }
        //         }
        //     },
        // {
        //     test: /.css$/,
        //     use:{
        //         loader: path.resolve('./loader/cssloader.js'),
        //         options:{
        //             module: true
        //         }
        //     }
        // }
        // ]
    },
    optimization: {
        minimizer: [new UglifyJsPlugin()],
    },
})