const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const isEnvProduction = process.env.NODE_ENV === 'production';
const entryPoints = fs.readdirSync(path.resolve('examples'));
const axePoints = fs.readdirSync(path.resolve('packages'));
const publicPath = isEnvProduction ? '' : '/';
const defaultHtmlPath = path.resolve('config/templates/index.html');
const iconPath = path.resolve('config/templates/favicon.ico');
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
    publicPath,
    path: path.resolve('website/examples'),
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
    alias: axePoints.reduce((obj, name) => {
      obj['@axe/' + name] = path.resolve('packages', name, 'src/index.ts');
      return obj;
    }, {}),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          fix: !isEnvProduction,
          emitErrors: false,
          formatter: 'stylish',
        }
      },
      {
        test: /\.(ts|js)$/,
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
              modules: {
                localIdentName: '[local]--[hash:base64:5]',
              },
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
      fix: !isEnvProduction,
      emitErrors: false,
      files: ['examples/**/*.css', '**/src/**/*.css'],
    }),
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
      inject: true,
      template: path.resolve('config/templates/navigation.html'),
      favicon: iconPath,
      filename: 'index.html',
      chunks: [],
      minify: isEnvProduction && htmlMinify,
      publicPath,
      entryPoints,
    }),
    ...entryPoints.map(point => {
      const htmlPath = path.resolve('examples', point, 'index.html');
      return new HtmlWebpackPlugin({
        inject: true,
        template: fs.existsSync(htmlPath) ? htmlPath : defaultHtmlPath,
        favicon: iconPath,
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
    watchOptions: {
      ignored: /node_modules/
    },
  }
};
