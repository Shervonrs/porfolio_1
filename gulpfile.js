const {src, dest, watch, series, parallel } = require('gulp'),
      autoprefixer = require('autoprefixer'),
      browserSync = require('browser-sync').create(),
      cssnano = require('cssnano'),
      concat =require('gulp-concat'),
      postcss = require('gulp-postcss'),
      reload = browserSync.reload,
      sass = require('gulp-sass'),
      sourcemaps =require('gulp-sourcemaps'),
      terser = require('gulp-terser');

      // File path variables
      const files = {
        scssPath: './scss/**/*.scss',
        jsPath: './js/**/*.js'
      }

      function scssTask (){
        return src(files.scssPath)
          .pipe(sourcemaps.init())
          .pipe(sass())
          .pipe(postcss([ autoprefixer(), cssnano() ]))
          .pipe(sourcemaps.write('.'))
          .pipe(dest('dist'))
          .pipe(browserSync.stream());
      }

      function jsTask(){
        return src(files.jsPath)
          .pipe(concat('bundle.js'))
          .pipe(terser())
          .pipe(dest('dist'))
          .pipe(browserSync.stream());
      }

      function watchTask(){
        browserSync.init({
          server: {
            baseDir:'./'
          }
        });
        watch([files.scssPath, files.jsPath],
          parallel(scssTask, jsTask));
          watch('./*.html').on('change', browserSync.reload);
      }

      exports.default = series (
        parallel(scssTask, jsTask),
        watchTask
      );
