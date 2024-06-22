const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtReloaderPlugin = require('webpack-ext-reloader')

module.exports = {
  watch: true,
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    popup: '@/scripts/popup.tsx',
    options: '@/scripts/options.tsx',
    side_panel: '@/scripts/side_panel.tsx',
    content: '@/scripts/content.ts',
    background: '@/scripts/background.ts'
  },
  output: {
    filename: 'src/[name].js'
  },
  plugins: [
    new CopyWebpackPlugin({ patterns: [{ from: '@/static' }] }),
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
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    alias: {
      '@': require('path').resolve(__dirname, 'src')
    },
    extensions: ['.tsx', '.ts', '.js']
  }
}
