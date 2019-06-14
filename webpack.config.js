const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const isEnvProduction = process.env.NODE_ENV === 'production';
const entryPoints = fs.readdirSync(path.resolve('examples'));
const defaultHtml = path.resolve('templates/index.html');
const htmlMinify = {
  removeComments: true,
  collapseWhitespace: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  removeStyleLinkTypeAttributes: true,
  keepClosingSlash: true,
  minifyJS: true,
  minifyCSS: true,
  minifyURLs: true,
};

module.exports = {
  mode: isEnvProduction ? 'production' : 'development',
  devtool: isEnvProduction ? 'source-map' : 'cheap-module-source-map',
  entry: entryPoints.reduce((obj, name) => {
    obj[name] = path.resolve('examples', name, 'index.ts');
    return obj;
  }, {}),
  output: {
    publicPath: '/',
    path: path.resolve('dist'),
    filename: isEnvProduction
      ? 'static/js/[name].[contenthash:8].js'
      : 'static/js/[name].js',
    chunkFilename: isEnvProduction
      ? 'static/js/[name].[contenthash:8].chunk.js'
      : 'static/js/[name].chunk.js',
  },
  optimization: {
    runtimeChunk: 'single',
  },
  resolve: {
    modules: [
      path.resolve('node_modules'),
    ],
    extensions: ['.ts', '.js'],
    mainFields: isEnvProduction ? ['module'] : ['unpkg', 'module'],
    alias: {
      '@axe': path.resolve('packages'),
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          fix: true,
        }
      },
      {
        test: /\.ts$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: !isEnvProduction,
              reloadAll: true,
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]___[hash:base64:5]',
            }
          },
          {
            loader: 'postcss-loader',
          },
        ]
      },
      {
        test: [/\.jpe?g$/, /\.png$/, /\.gif$/],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/img/[name].[hash:8].[ext]',
        },
      },
    ]
  },
  plugins: [
    new StyleLintPlugin({
      fix: true,
      files: ['examples/**/*.css', 'packages/**/*.css'],
    }),
    isEnvProduction && new CleanWebpackPlugin(),
    !isEnvProduction && new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['Your application is running at http://localhost:5000/']
      },
    }),
    new MiniCssExtractPlugin({
      filename: isEnvProduction
        ? 'static/css/[name].[contenthash:8].css'
        : 'static/css/[name].css',
      chunkFilename: isEnvProduction
        ? 'static/css/[name].[contenthash:8].chunk.css'
        : 'static/css/[name].chunk.css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: path.resolve('templates/nav.html'),
      filename: 'index.html',
      chunks: false,
      minify: isEnvProduction && htmlMinify,
      entryPoints,
    }),
    ...entryPoints.map(point => {
      const htmlFile = path.resolve('examples', point, 'index.html');
      return new HtmlWebpackPlugin({
        inject: true,
        template: fs.existsSync(htmlFile) ? htmlFile : defaultHtml,
        filename: point + '.html',
        chunks: ['runtime', point],
        minify: isEnvProduction && htmlMinify,
      })
    }),
  ].filter(Boolean),
  stats: {
    entrypoints: false,
    assets: true,
    chunks: false,
    modules: false,
    children: false,
  },
  devServer: {
    host: '0.0.0.0',
    port: 5000,
    contentBase: false,
    historyApiFallback: true,
    quiet: true,
    noInfo: false,
  }
};
