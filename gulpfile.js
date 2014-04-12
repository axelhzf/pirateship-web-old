var gulp = require("gulp");
var jade = require("gulp-jade");
var sass = require("gulp-sass");

var paths = {
  jade : "client/templates/*.jade",
  sass : "client/styles"
};

gulp.task("jade", function () {
  gulp.src(paths.jade)
    .pipe(jade())
    .pipe(gulp.dest(".tmp/templates/"));
});

gulp.task("sass", function () {
  gulp.src(paths.sass + "/main.scss")
    .pipe(sass())
    .pipe(gulp.dest(".tmp/style/"));
});

gulp.task("watch", function () {
  gulp.watch(paths.jade, ["jade"]);
  gulp.watch(paths.sass + "/*.scss", ["sass"]);
});

gulp.task("default", ["jade", "sass"]);