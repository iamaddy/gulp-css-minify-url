var gulp = require('gulp');
var minifyUrl = require('../');

gulp.src('example/*.html')
  .pipe(minifyUrl())
  .pipe(gulp.dest('dist/'));