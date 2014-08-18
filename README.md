gulp-css-minify-url
===================

a plugin make css links to minify format link

Usage

First, install gulp-css-minify-url as a development dependency:

add it to your gulpfile.js:
```
var minifyUrl = require('gulp-css-minify-url');

gulp.task('templates', function(){
  gulp.src(['file.html'])
    .pipe(minifyUrl())
    .pipe(gulp.dest('build/'));
});
```
