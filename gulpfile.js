const gulp = require('gulp'),
      autoprefixer = require('gulp-autoprefixer'),
      babelify = require('babelify'),
      browserify = require('browserify'),
      browserSync = require('browser-sync').create(),
      buffer = require('vinyl-buffer'),
      cleanCSS = require('gulp-clean-css'),
      concat =require('gulp-concat'),
      env = require('babel-preset-env'),
      imagemin = require('gulp-imagemin'),
      lineEC =require('gulp-line-ending-corrector'),
      log =require('gulplog'),
      reload = browserSync.reload,
      sass = require('gulp-sass'),
      source= require('vinyl-source-stream'),
      sourcemaps =require('gulp-sourcemaps'),
      terser= require('gulp-terser');

      function css() {
        return gulp.src('./scss/**/*.scss')
        .pipe(sourcemaps.init({loadMaps:true}))
        .pipe(sass({
          outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(sourcemaps.write('./'))
        .pipe(lineEC())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
      }

      function concatCSS(){
        return gulp.src('./css/styles.css')
        .pipe(sourcemaps.init({loadMaps: true, largeFile:true}))
        .pipe(concat('style.min.css'))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('./'))
        .pipe(lineEC())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
      }

      function browif(){
        let b = browserify({
          entries: './js/main.js',
          debug: true,
          transform:[babelify.configure({
            presets:['babel-preset-env']
          })]
        })
        return b.bundle()
        .pipe(source('bundle.min.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(terser())
        .on('error', log.error)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('js'))
        .pipe(browserSync.stream())
      }

      function watch(){
        browserSync.init({
          server: {
            baseDir:'./'
          }
        });
        gulp.watch('./scss/**/*.scss', gulp.series([css, concatCSS]));
        gulp.watch('./js/main.js', browif); //gulp.series([javascript, browif]));
        gulp.watch('./*.html').on('change', browserSync.reload);
      }

      exports.css = css;
      exports.concatCSS = concatCSS;
      exports.browif = browif;
      exports.watch = watch;


      const build = gulp.parallel(watch);
      gulp.task('default', build);
