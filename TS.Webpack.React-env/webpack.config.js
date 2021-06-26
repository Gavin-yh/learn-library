const { mode } = require('yargs-parser')(process.argv.slice(2))
const merge = require('webpack-merge')
const config = require(`./config/webpack.${mode}.js`)
const {jion, resolve} = require('path')
const { CheckerPlugin } = require('awesome-typescript-loader')
let defaultConfig = {
    entry: {
        app:resolve('./src/web/index.tsx')
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
        rules: [
                {
                    test: /\.(js|ts|jsx|tsx)$/,
                    include: [resolve('src')],   // 包含的文件
                    exclude: /node_modules/,   //排除的文件
                    loader:'babel-loader'
            }
        ]
    },
    plugins: [
        new CheckerPlugin()
    ]
}

module.exports = merge(defaultConfig, config)