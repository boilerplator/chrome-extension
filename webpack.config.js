const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');

const package = require('./package.json');

const IS_DEVELOP_MODE = process.env.NODE_ENV === 'development';

module.exports = {
  context: __dirname,
  target: 'web',
  entry: './src/App',
  output: {
    filename: '[name].[hash:8].js',
    // publicPath: IS_DEVELOP_MODE ? './' : '/',
    path: path.resolve(__dirname, 'app'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.join(__dirname, 'src'),
        ],
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', { modules: false }],
          ],
          plugins: [
            ['transform-react-jsx', { 'pragma': 'h' }],
            ['transform-runtime', {
              'helpers': false,
              'polyfill': true,
              'regenerator': true,
              'moduleName': 'babel-runtime',
            }],
            'transform-object-rest-spread',
            'transform-decorators-legacy',
            'transform-class-properties',
            ['import', { 'libraryName': 'antd', 'style': 'css' }],
          ],
        },
      },
      {
        test: /\.tsx?$/,
        include: [
          path.join(__dirname, 'src'),
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['env', {
                  modules: 'commonjs',
                  targets: {
                    browsers: ['>1%', 'last 5 versions', 'safari >= 7']
                  }
                }],
              ],
              plugins: [
                ['transform-react-jsx', { 'pragma': 'h' }],
                ['transform-runtime', {
                  'helpers': false,
                  'polyfill': true,
                  'regenerator': true,
                  'moduleName': 'babel-runtime',
                }],
                'transform-object-rest-spread',
                'transform-decorators-legacy',
                'transform-class-properties',
                ['import', { 'libraryName': 'antd', 'style': 'css' }],
              ],
            },
          },
          {
            loader: 'awesome-typescript-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.(css|less)$/,
        include: [
          path.join(__dirname, 'node_modules'),
        ],
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.css$/,
        include: [
          path.join(__dirname, 'src'),
        ],
        use: [
          'style-loader',
          'css-loader',
          // {
          //   loader: 'css-loader',
          //   options: {
          //     modules: true,
          //     localIdentName: process.env.NODE_ENV === 'production' ? '[hash:base64:5]' : '[path][name]__[local]--[hash:base64:5]',
          //   },
          // },
        ],
      },
      {
        test: /\.scss$/,
        include: [
          path.join(__dirname, 'src'),
        ],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: process.env.NODE_ENV === 'production' ? '[hash:base64:5]' : '[path][name]__[local]--[hash:base64:5]',
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(svg|png|jpeg)$/,
        loader: 'file-loader',
      },
    ],
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src'),
    ],
    alias: {
      assets: path.resolve('./src/assets'),
      components: path.resolve('./src/components'),
      utils: path.resolve('./src/utils'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new HtmlWebpackPlugin({
      // hash: true,
      inject: true,
      // title: 'One Extension',
      // chunks: ['vendor', 'popup'],
      template: path.join(__dirname, 'public/index.html'),
      filename: IS_DEVELOP_MODE ? 'index.html' : 'popup.html',
    }),
    // new HtmlWebpackPlugin({
    //   // hash: true,
    //   inject: true,
    //   title: 'moetab background',
    //   chunks: ['vendor', 'bg'],
    //   template: path.join(__dirname, 'public/bg.html'),
    //   filename: 'bg.html',
    // }),
    // new HtmlWebpackPlugin({
    //   // hash: true,
    //   inject: true,
    //   title: 'moetab settings',
    //   chunks: ['settings'],
    //   template: path.join(__dirname, 'public/settings.html'),
    //   filename: 'settings.html',
    // }),
    new webpack.HotModuleReplacementPlugin(),
  ].concat(process.env.VISUALIZE ? [new Visualizer()] : [])
  .concat(process.env.NODE_ENV === 'production' ? [new webpack.optimize.UglifyJsPlugin({
        parallel: true,
        uglifyOptions: {
          compress: {
            screw_ie8: true, // React doesn't support IE8
            warnings: false,
            drop_console: true,
            pure_funcs: ['console.log'],
          },
          mangle: {
            screw_ie8: true,
          },
          output: {
            comments: false,
            screw_ie8: true,
            ascii_only: true,
          },
        },
      })] : []),
  devServer: {
    host: process.env.HOST || '127.0.0.1',
    port: process.env.PORT || 9000,
    proxy: {
      '/api': 'http://localhost:3000',
    },
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    hot: true,
    https: false,
    noInfo: true,
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  devtool: process.env.NODE_ENV === 'production' ? false : 'cheap-source-map',
};