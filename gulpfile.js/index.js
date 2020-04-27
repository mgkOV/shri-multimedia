const gulp = require("gulp");
const browserSync = require("browser-sync").create("server");

const css = require("./tasks/css");
const html = require("./tasks/html");
const javascript = require("./tasks/javascript");

function watch() {
  browserSync.init({
    server: {
      baseDir: ".",
    },
    port: 3102,
    cors: true,
  });

  gulp.watch("./src/**/*.scss", { ignoreInitial: false }, css);

  gulp
    .watch(["./src/*.html"], { ignoreInitial: false }, html)
    .on("change", browserSync.reload);

  gulp
    .watch("./src/**/*.js", { ignoreInitial: false }, javascript)
    .on("change", browserSync.reload);
}

module.exports = {
  build: gulp.series(gulp.parallel(css, javascript), html),
  watch,
};
