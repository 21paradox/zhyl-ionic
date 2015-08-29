var appName = 'zhyl';

console.time('load-plugin');
var lazy = require('lazy-modules');
//var streamqueue = require('streamqueue');
var es = require('event-stream');

var gulp = require('gulp');
var concat = require('gulp-concat');

var rimraf = require("rimraf");
var path = require('path');
var url = require('url');

lazy('node_modules/gulp-uglify'); /* var gulp_uglify */

lazy('node_modules/gulp-dom-src'); /* var gulp_dom_src */ //用来打包index.html的js文件为一个

lazy('node_modules/gulp-angular-templatecache');  /* var gulp_angular_templatecache */

lazy('node_modules/cheerio'); /* var cheerio */  //改变dom结构

lazy('node_modules/gulp-minify-css'); /* var gulp_minify_css */

lazy('node_modules/gulp-imagemin'); /* var gulp_imagemin */

lazy('node_modules/gulp-ng-annotate'); /* var gulp_ng_annotate */

console.timeEnd('load-plugin');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('sass', function (done) {

  var sass = require('gulp-sass');
  var rename = require('gulp-rename');

  gulp.src('./scss/ionic.app.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(gulp_minify_css({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('clean', function (cb) {
  rimraf(path.resolve('build'), cb);
});

var dest = function (p) {
  var path = p || '';
  return gulp.dest('build/' + path);
}

gulp.task('build', function () {

  var ngCacheStream = gulp.src(['www/templates/*.html'])

    .pipe(es.map(function (file, cb) {
      var $ = cheerio.load(file.contents.toString());

      $('img').each(function (index, elem) {
        var src = $(this).attr('src');
        if (src) {
          // http or https or // 不变
          // / or ./  加上域名
          var newSrc = url.resolve('http://7xkfoy.com1.z0.glb.clouddn.com', src);
          $(this).attr('src', newSrc);
        }
      });

      file.contents = new Buffer($.html());
      cb(null, file);
    }))

    .pipe(gulp_angular_templatecache('templates.js', {
      module: appName,
      root: 'templates'
    }))

    .pipe(gulp_uglify());


  var jsStream = gulp_dom_src({
    file: 'www/index.html',
    selector: 'script[data-concat!="false"]',
    attribute: 'src'
  })

    .pipe(gulp_ng_annotate())

    .pipe(gulp_uglify());


  var combineJs = es.merge(jsStream, ngCacheStream)

    .pipe(concat('app.full.min.js'))

    .pipe(dest());


  var htmlStream = gulp.src('www/index.html')

    .pipe(es.through(function (data) {

      // load jsdom
      var $ = cheerio.load(data.contents.toString());

      // 移除js和css
      $('script[data-concat!="false"]').remove();
      $('link[rel="stylesheet"]').remove();
                       
      // append 合并的js和css 路径
      $('head').append('<link rel="stylesheet" href="css/app.full.min.css">\n');

      $('body').after('<script src="app.full.min.js"></script>\n');

      data.contents = new Buffer($.html());

      // emit
      this.emit('data', data);
    }))

    .pipe(concat('index.html'))

    .pipe(dest());

  var cssStream = gulp_dom_src({
    file: 'www/index.html',
    selector: 'link',
    attribute: 'href'
  })

    .pipe(concat('app.full.min.css'))

    .pipe(gulp_minify_css())

    .pipe(dest('css'));

  var imageStream = gulp.src(['www/img/**/*'])

    .pipe(gulp_imagemin({
      progressive: true
    }))

    .pipe(dest('img'));

  var fontStream = gulp.src(['www/lib/ionic/fonts/*']).pipe(dest('fonts'));

  return es.merge(combineJs, htmlStream, cssStream, imageStream, fontStream);

});
