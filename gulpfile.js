//Declarations
const gulp = require("gulp");
const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-dart-sass");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const terser = require("gulp-terser");
const browsersync = require("browser-sync").create();
const babel = require("gulp-babel");
const autoprefixer = require("autoprefixer");
const rename = require("gulp-rename");

//CSS tasks
function cssTask(cb) {
  return gulp
    .src("./src/scss/main.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./dist/css"))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(gulp.dest("./dist/css"));
  cb();
}

//Javascript tasks
async function babelTask() {
  src("src/scripts/**/*.js")
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(terser())
    .pipe(dest("dist/js"));
}

//Browser tasks
function browsersyncServer(cb) {
  browsersync.init({
    server: {
      baseDir: ".",
    },
  });
  cb();
}

//Reload on save
function browsersyncReload(cb) {
  browsersync.reload();
  cb();
}

// Watch Task
function watchTask() {
  watch(["*html", "src/html/**/*.html"], browsersyncReload);
  watch(
    ["src/scss/**/*.scss", "src/scripts/**/*.js"],
    series(cssTask, babelTask, browsersyncReload)
  );
}

// Default Gulp Task
exports.default = series(cssTask, babelTask, browsersyncServer, watchTask);
