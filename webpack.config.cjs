const path = require("path");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  target: "node",
  output: {
    filename: "main.cjs",
    path: path.resolve(__dirname, "dist"),
  },
  externals: {
    serialport: "commonjs serialport",
  },
  resolve: {
    extensions: [".js"],
  },
};
