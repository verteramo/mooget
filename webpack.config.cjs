/*******************************************************************************
 * webpack.config.cjs
 *
 * @license GPL-3.0-or-later
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/** External modules */
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
    popup: '@/pages/popup/Popup',
    options: '@/pages/options/Options',
    sidepanel: '@/pages/sidepanel/SidePanel',

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
        extensionPage: ['popup', 'options', 'sidepanel'],
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
