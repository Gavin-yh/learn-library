const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurifyCSSPlugin = require('purifycss-webpack'); // css tree-shaking
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default //js 深度tree-shaking
const glob = require('glob'); //全局匹配  匹配html/js...
const HtmlWebpackPlugin = require('html-webpack-plugin'); //对html进行操作
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin'); //清楚dist下多余的文件

const webpack = require('webpack')//用内置的hotModuleReplacementPlugin 热更新
//postCss

module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                // loader:"style-loader"
                loader: MiniCssExtractPlugin.loader,
            }, {
                loader: 'css-loader'
            }, {
                loader: 'postcss-loader',
                options: {
                    ident: 'postcss',
                    plugins: [
                        require('cssnano')()
                    ]
                }
            }]
        }, {
            test: /\.(jpg|png|gif|)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    //限制大仙，当 <= 10000kb 将图片转化成base64编码
                    limit: 10000,
                    name: '[name].[hash:5].[ext]',
                    outputPath: 'img'
                }
            }, {
                loader: 'img-loader',
                options: {
                    plugins: [
                        require('imagemin-gifsicle')({
                            interlaced: false
                        }),
                        require('imagemin-mozjpeg')({
                            progressive: true,
                            arithmetic: false
                        }),
                        require('imagemin-pngquant')({
                            floyd: 0.5,
                            speed: 2,
                            quality: [0.3, 0.5]
                        }),
                        require('imagemin-svgo')({
                            plugins: [{
                                    removeTitle: true
                                },
                                {
                                    convertPathData: false
                                }
                            ]
                        })
                    ]
                }
            }]
        }, {
            test: /\.html$/,
            use: [{
                loader: 'html-loader',
                options: {
                    attrs: ['img:src']
                }
            }]
        }]
    },
    devServer: {
        port: "9900",
        proxy:{

        },
        hot: true  //hot module replacement. Depends on HotModuleReplacementPlugin  HotModuleReplacementPlugin是webpack内置的插件

    },
    resolve: {
        // 解析模块请求的选项
        // （不适用于对 loader 解析）

        // modules: [
        //     "node_modules",
        //     "src",
        //     path.resolve(__dirname, "app")
        // ],
        // 用于查找模块的目录

        // 使用的扩展名
        extensions: [".js", ".json", ".jsx", ".css"],
　      //即demo.css这个文件我们不需要添加.css后缀就可以引用到了，如果不用extensions， 我们就必须要用demo.css来引入这个文件
        alias: {
            // 模块别名列表

            "sum":path.resolve(__dirname, "./src/sum.js"),
            // 起别名："module" -> "new-module" 和 "module/path/file" -> "new-module/path/file"

            // 模块别名相对于当前上下文导入
        },
    },
    // 使用的扩展名
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[hash:5].css'
        }),
        new WebpackDeepScopeAnalysisPlugin(),
        //
        //css tree-shaking使用的话  cssnano就不生效
        // new PurifyCSSPlugin({
        //     // Give paths to parse for rules. These should be absolute!
        //     paths: glob.sync(path.join(__dirname, './*.html'))
        //     // paths: glob.sync([path.join(__dirname, './src/*.js'), path.join(__dirname, './*.html')]),
        // }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html'
            //minify:可以是一个对象或boolean值,对象的话可以压缩空格，去掉注释等单独设置
            //剩余的参数看npm
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
}