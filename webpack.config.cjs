const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtReloaderPlugin = require('webpack-ext-reloader')
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  watch: true,
  mode: 'development',
  devtool: 'inline-source-map',
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

    // Popup page
    new HtmlWebpackPlugin({
      template: './src/templates/page.html',
      filename: 'pages/popup.html',
      chunks: ['popup']
    }),

    // Options page
    new HtmlWebpackPlugin({
      template: './src/templates/page.html',
      filename: 'pages/options.html',
      chunks: ['options']
    }),

    // Side panel page
    new HtmlWebpackPlugin({
      template: './src/templates/page.html',
      filename: 'pages/side_panel.html',
      chunks: ['side_panel']
    }),

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
      }
    ]
  }
}
