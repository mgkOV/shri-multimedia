const gulp = require("gulp");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

const browserSync = require("browser-sync").get("server");

function css() {
  const modules = [autoprefixer(), cssnano()];

  return gulp
    .src("./src/assets/style.scss", { sourcemaps: true })
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss(modules))
    .pipe(rename("style.css"))
    .pipe(gulp.dest(`./assets`, { sourcemaps: true }))
    .pipe(browserSync.stream());
}

module.exports = gulp.series(css);
