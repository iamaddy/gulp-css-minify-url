gulp-css-minify-url
===================

a plugin make css links to minify format link

### Usage

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
do a simple thing like this:
```
<html>
<head>
<!-- htmlbuild:css
<link href="css/stylesheet1.css"/>
<link href="css/stylesheet2.css"/>
<link href="css/stylesheet12.css"/>
<link href="css/stylesheet10.css"/>
<link href="css/stylesheet11.css"/>
endbuild -->
</head>
<body>
...
</body>
</html>
```
after minifyUrl,the result like this:
```
<html>
<head>
<!-- htmlbuild:css
<link href="css/stylesheet1.css"/>
<link href="css/stylesheet2.css"/>
<link href="css/stylesheet12.css"/>
<link href="css/stylesheet10.css"/>
<link href="css/stylesheet11.css"/>
endbuild -->
<link rel="stylesheet" href="/min/f=css/stylesheet1.css,css/stylesheet2.css,css/stylesheet12.css,css/stylesheet10.css,css/stylesheet11.css"/>
</head>
<body>
...
</body>
</html>
```
Attention
you style links must in the special block:
```
<!-- htmlbuild:css
endbuild -->
```
