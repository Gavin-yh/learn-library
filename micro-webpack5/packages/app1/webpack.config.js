const { ModuleFederationPlugin } = require('webpack').container
// 模块和模块所需要的东西暴露出去
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    module: {
        rules: [
            {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                presets: ['@babel/preset-react']
                }
            }
            }
        ]
    },
    // 想使用别人的模块(app2中的模块)，也就是三方的模块
    plugins: [
        new ModuleFederationPlugin({
            name: 'app1',
            library: {  // 用var的形式，将全局的代码用var挂载
                type: 'var',
                name: 'app1'
            },
            remotes: { // 要使用别人的模块
                // app2: 'app2@http://localhost:8889/remote.js',
                app2: 'app2'
            },
            shared: { //要相互共享的模块
                react: {
                    singleton: true, //单例
                    eager: true,
                },
                'react-dom': {
                    singleton: true, //单例
                    eager: true,
                }
            },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ],
}