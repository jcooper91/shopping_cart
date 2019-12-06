const path = require("path")

module.exports = {
    entry: ['babel-polyfill', './src/scripts/index.js'],
    output: {
        path: path.resolve(__dirname, 'public/scripts'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env'],
                    plugins: ['transform-object-rest-spread']
                }
            }, 
            test: /\.css$/,
            use: ['style-loader','css-loader']
        }, {
            test: /\.(png|svg|jpg|gif|jpeg)$/,
            use: ['file-loader', 'url-loader'],
        },
     { 
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        loader: "url-loader?limit=10000&mimetype=application/font-woff" 
      },
      { 
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        loader: "file-loader" 
      },
      {
        test : /\.(eot|otf|woff|woff2|ttf|svg)(\?\S*)?$/,
        loader: 'url-loader?name=/assets/fonts/[name].[hash].[ext]',
        }
    ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        publicPath: '/scripts/'
    },
    devtool: 'source-map'
}