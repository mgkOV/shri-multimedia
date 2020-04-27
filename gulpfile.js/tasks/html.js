const gulp = require("gulp");

function html() {
  return gulp
    .src("./src/*.html")

    .pipe(gulp.dest("./"));
}

module.exports = gulp.series(html);
