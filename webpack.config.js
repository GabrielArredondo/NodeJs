const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';
console.log(devMode);
module.exports ={
    entry: './frontend/app.js',
    output: {
        path: path.join(__dirname, 'backend/public'),
        filename: 'js/bundle.js'
    },
    //para integrar los estilos
    module: {
        rules:[
            {
                test: /\.css/,
                use: [
                  devMode?  'style-loader': MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './frontend/index.html',
            minify:{
                collapseWhitespace: true,
                removeComments:true,
                removeRedundantAttributes: true,
                //removeStyleLinkTypeAttributes:true,
                removeStyleLinkTypeAttributes:true,
                removeScriptTypeAttributes: true,
                useShortDoctype: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'theme/bundle.css'
        })
    ],
    devtool: 'source-map'
}