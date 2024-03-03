const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WebpackExtReloader = require("webpack-ext-reloader");
const path = require("path");

module.exports = {
  watch: true,
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    popup: "./src/popup/index.tsx",
    content: "./src/content/index.ts",
    background: "./src/background/index.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      }
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve("static"),
          to: path.resolve("dist"),
        },
      ],
    }),
    new WebpackExtReloader({
      entries: {
        extensionPage: "popup",
        contentScript: "content",
        background: "background",
      },
    }),
  ],
};
