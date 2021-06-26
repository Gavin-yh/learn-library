#### Webpack 环境搭建
> 搭建环境

#### part one
* 配置scripty(window 下的可执行文件: .bat, Mac下的可执行文件： .sh)
    * 抽离npm-script
* 抽离不同环境的配置文件,根据不同的环境，去merge相应的配置文件。
* 配置解析.tsx文件，
    * awesome-typescript-loader
    * 还需要npm install typescript,配置tsconfig.js
* 配置hotReload
    * webpack-dev-server
    ```
    devServer: {
        historyApiFallback:true,   //需要配置，不然路由会找不到
        hot: true,   //热更新
        contentBase: './dist'
    }
    ```
* 配置其他辅助的包
    * 稍微了解下：json2typescript等包。
    * 错误消息提示包：friendly-errors-webpack-plugin
    * 构建完成提示包：webpack-build-notifier

* suspense + 异步数据处理
    * react-hooks-fetch 