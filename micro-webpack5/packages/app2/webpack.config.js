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
            name: 'app2',
            library: {  // 用var的形式，将全局的代码用var挂载
                type: 'var',
                name: 'app2'
            },
            exposes: {
                './App2': './src/app',  // 要暴露的组件
                './Button': './src/button'
            },
            filename: 'remote.js',  //往外暴露的文件名, 将这个交给APP1,
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

// app2, 打出来的包，会有两个额外的： remote.js, src_button_js.js这两个包专门和外面合作，让别的应用去加载。
