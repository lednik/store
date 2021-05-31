var path = require('path')
const { mainModule } = require('process')
var webpack = require('webpack')

module.exports = {
  entry: ['./src/main.js', './src/sass/main.sass'],
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: process.env.NODE_ENV === 'production'
    ? '/front/dist'
    : '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader',
          // {
          //   loader: 'sass-resources-loader',
          //   options: {
          //     resources: path.resolve('./src/sass/main.sass'),
          //   }
          // }
        ],
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader?indentedSyntax',
          // {
          //   loader: 'sass-loader?indentedSyntax',
          //   options: {
          //     additionalData: `$light: #fff;`
          //   },
          // }
          // {
          //   loader: 'style-resources-loader',
          //   options: {
          //       patterns: [
          //         path.join(__dirname, 'src/sass/main.sass'),
          //       ]
          //   }
          // },
          // {
          //   loader: 'sass-resources-loader',
          //   options: {
          //     resources: path.resolve(__dirname, 'src/sass/main.sass'),
          //   }
          // }
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ],
            'sass': [
              'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax'
            ]
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules(?![/|\\](bootstrap|foundation-sites|dom7|swiper))/],
        // exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      // styles: path.resolve(__dirname, 'src', 'assets', 'sass'),
      '@styles': path.resolve(__dirname, 'src/sass'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@ui': path.resolve(__dirname, 'src/components/ui'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@layout': path.resolve(__dirname, 'src/layout'),
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
