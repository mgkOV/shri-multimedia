const gulp = require("gulp");
const webpack = require("webpack");

function javascript(done) {
  webpack(require("../../webpack.config.js"), function (err, stats) {
    if (err) {
      console.log(err.toString());
    }

    console.log(stats.toString());
    done();
  });
}

module.exports = gulp.series(javascript);
