const path = require("path");

const config = {
  mode: "production",
  entry: "./src/js/script.js",
  output: {
    path: path.resolve(__dirname, "assets"),
    filename: "script.js",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};

module.exports = config;
