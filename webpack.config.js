const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const TARGET = process.env.npm_lifecycle_event
const PATHS = {
  app: path.join(__dirname, 'webapp'),
  build: path.join(__dirname, '_site')
}

module.exports = {
  entry: {
    bundle: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.html']
  },
  module: {
    // linting
    preLoaders: [{
      test: /\.jsx?$/,
      loader: 'eslint',
      include: PATHS.app
    }],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        query: {
          cacheDirectory: true, presets: ['react', 'es2015']
        },
        include: PATHS.app
      },
      {test: /\.html/, loader: 'html'},
      {
        // css-loader will resolve @import and url statements in CSS files.
        // style-loader deals with require statements in our JavaScript.
        test: /\.css$/, loaders: ['style', 'css'], include: PATHS.app
      },
      // Bootstrap loaders
      {test: /\.less$/, loader: "style!css!less"},
      // **IMPORTANT** This is needed so that each bootstrap js file required by
      // bootstrap-webpack has access to the jQuery object
      { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
      // Needed for the css-loader when bootstrap-webpack loads bootstrap's css.
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&minetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,  loader: "url?limit=10000&minetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=image/svg+xml" }
    ]
  },
  devServer: {
    contentBase: PATHS.build,
    // Enable history API fallback for HTML5 routing.
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    // Display only errors to reduce the amount of output.
    stats: 'errors-only',

    host: process.env.HOST,
    port: process.env.PORT
  },
  // enable source maps
  devtool: '#eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: PATHS.app + '/index.html',
      inject: 'body',
      filename: 'index.html'
    })
  ]
}
