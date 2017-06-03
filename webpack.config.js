const path = require('path')
const webpack = require('webpack')

var PROD = JSON.parse(process.env.PROD_ENV || '0');

module.exports = {
  context: path.resolve(__dirname),
  entry: {
    statuspage: './src/statuspage.js'
  },
  target: 'node',
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules')
    ],
    extensions: ['.js']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: '[name].js',
    libraryTarget: 'commonjs2'
  },
  externals: [
    'axios'
  ],
  plugins: PROD ? [
     new webpack.optimize.UglifyJsPlugin({
       compress: {
         warnings: false
       },
       comments: false,
       sourceMap: false
    })
  ] : [] ,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            ["es2015", {modules: false}],
            "es2017",
            'stage-0'
          ],
          plugins: [
            'syntax-dynamic-import',
            'transform-async-to-generator',
            'transform-regenerator',
            'transform-runtime',
            'babel-plugin-transform-object-rest-spread'
          ]
        }
      }
    ]
  }
}
