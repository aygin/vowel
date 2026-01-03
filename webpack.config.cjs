const path = require("path");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  target: "node",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
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
      }
    ]
  },
  ignoreWarnings: [
    {
      module: /node_modules\/@eshaz\/web-worker/,
      message: /Critical dependency: the request of a dependency is an expression/,
    },
  ],
};
