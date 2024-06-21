const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtReloaderPlugin = require('webpack-ext-reloader')

module.exports = {
  watch: true,
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    popup: './src/scripts/popup.tsx',
    options: './src/scripts/options.tsx',
    content: './src/scripts/content.ts',
    background: './src/scripts/background.ts'
  },
  output: {
    filename: 'src/[name].js'
  },
  plugins: [
    new CopyWebpackPlugin({ patterns: [{ from: 'src/static' }] }),
    new ExtReloaderPlugin({
      reloadPage: true,
      entries: {
        extensionPage: ['popup', 'options'],
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
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
}
