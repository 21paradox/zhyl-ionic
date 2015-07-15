var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});



var gulp = require('gulp'); 
var domSrc = require('gulp-dom-src'); // 用来打包index.html的js文件为一个
var concat = require('gulp-concat');    // 合并js
var uglify = require('gulp-uglify');    // 压缩js
var templateCache = require('gulp-angular-templatecache');

var es = require('event-stream');
var streamqueue = require('streamqueue');
var cheerio = require('cheerio');   //改变dom结构
var rimraf = require("rimraf");
var path = require('path');
var  minifyCSS = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');

 
var replace = require('gulp-replace');

gulp.task('templates', function(){
  gulp.src(['file.txt'])
    .pipe(replace(/foo(.{3})/g, '$1foo'))
    .pipe(gulp.dest('build/file.txt'));
}); 


gulp.task('clean', function(cb) {   
    rimraf(path.resolve('build'), cb);    
});

var dest = function (p) {
    var path = p || '';
    return gulp.dest('build/' + path);
}

gulp.task('build', function () {

    var ngCacheStream = gulp.src(['www/templates/*.html'])
    
                      .pipe(replace(/<img[^>]+src="?([^"\s]+)"?\s.*\/>/g, function(a, imgUrl){
                        
                        console.log(imgUrl);
                        return 'http://localhost:8100' + imgUrl;
                      }))
    
                        .pipe(templateCache('templates.js', {
                            module: 'starter',
                            root: 'templates'
                        }));
                        
                        
    var jsStream = domSrc({
        file: 'www/index.html',
        selector: 'script[data-concat!="false"]',
        attribute: 'src'
    });

    var combineJs = streamqueue({
        objectMode: true
    }, jsStream, ngCacheStream)

    .pipe(concat('app.full.min.js'))

    //.pipe(uglify())

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

    var cssStream = domSrc({
                        file: 'www/index.html',
                        selector: 'link',
                        attribute: 'href'
                    })

                    .pipe(concat('app.full.min.css'))
                    
                    .pipe(minifyCSS())

                    .pipe(dest('css'));
    
    var imageStream = gulp.src(['www/img/**/*'])
    
        .pipe(imagemin({
           progressive: true
       }))
    
        .pipe(dest('img'));
    
    var fontStream = gulp.src(['www/lib/ionic/fonts/*']).pipe(dest('fonts')); 

    return es.merge(combineJs, htmlStream, cssStream, imageStream, fontStream);

});
