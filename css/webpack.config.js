const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    module: {
        // rules: [{
        //     test: /.css$/,
        //     use: [MiniCssExtractPlugin.loader, "css-loader"]
        // }]
        rules: [{
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        importLoaders: 1
                    }
                },
                'postcss-loader'
            ]
        }]
    },
    plugins: [new MiniCssExtractPlugin()],
}