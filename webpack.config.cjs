const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtReloaderPlugin = require('webpack-ext-reloader')
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  watch: true,
  mode: 'development',
  devtool: 'cheap-module-source-map',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    plugins: [new TSConfigPathsPlugin()]
  },
  entry: {
    // Pages
    popup: '@/pages/Popup',
    options: '@/pages/Options',
    side_panel: '@/pages/SidePanel',

    // Scripts
    content: '@/scripts/content',
    background: '@/scripts/background'
  },
  output: {
    clean: true,
    filename: 'scripts/[name].js'
  },
  plugins: [
    // Copy static files
    new CopyWebpackPlugin({ patterns: [{ from: './src/static' }] }),

    // Extension reloader
    new ExtReloaderPlugin({
      reloadPage: true,
      entries: {
        extensionPage: ['popup', 'options', 'side_panel'],
        contentScript: 'content',
        background: 'background'
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript',
              ['@babel/preset-react', { runtime: 'automatic' }]
            ]
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}
