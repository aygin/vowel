const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const buildMode = process.env.NODE_ENV || "development"; // "production" | "development"

module.exports = {
  entry: {
    server: { import: './src/SERVER/server.js', filename: 'server/[name].js' },
    ui: { import: './src/UI/src/main.js', filename: 'ui/[name].js' },
    // styles: './src/UI/src/styles.css',
  },
  target: "node",
  mode: buildMode,
  externalsPresets: { node: true },
  output: {
    clean: true
  },
  externals: {
    serialport: "commonjs serialport",
  },
  resolve: {
    extensions: [".js"],
  },
  module: {
  rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            targets: "defaults",
            presets: [
              ['@babel/preset-env']
            ]
          }
        }
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(ogg|mp3|wav)$/i,
        type: 'asset/resource',
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/UI/index.html',
      filename: 'ui/index.html',
      chunks: ['ui' , 'styles'], // Only include the UI entry point
    }),
    new MiniCssExtractPlugin({
      filename: 'ui/styles.css'
    }),
  ],
  ignoreWarnings: [
    {
      module: /node_modules\/@eshaz\/web-worker/,
      message: /Critical dependency: the request of a dependency is an expression/,
    },
  ],
};
