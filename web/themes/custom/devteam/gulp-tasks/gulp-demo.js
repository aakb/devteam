/* globals require */

(function () {

  'use strict';

  // SCSS/CSS
  var sass = require('gulp-sass');
  var sassGlob = require('gulp-sass-glob');
  var sourcemaps = require('gulp-sourcemaps');
  var sassLint = require('gulp-sass-lint');
  var prefix = require('gulp-autoprefixer');
  var cached = require('gulp-cached');
  var plumber = require('gulp-plumber');
  var notify = require('gulp-notify');
  var flatten = require('gulp-flatten');
  var gulpif = require('gulp-if');
  var cleanCSS = require('gulp-clean-css');
  // var sassdoc = require('sassdoc');
  var del = require('del');

  module.exports = function (gulp, config, tasks, browserSync) {

    function cssCompile(done) {
      gulp.src(config.demoConfig.src)
      .pipe(sassGlob())
      .pipe(plumber({
        errorHandler: function (error) {
          notify.onError({
            title: 'CSS <%= error.name %> - Line <%= error.line %>',
            message: '<%= error.message %>'
          })(error);
          this.emit('end');
        }
      }))
      .pipe(sourcemaps.init({
        debug: config.debug
      }))
      .pipe(sass({
        outputStyle: config.demoConfig.outputStyle,
        sourceComments: config.demoConfig.sourceComments,
        includePaths: require('node-normalize-scss').with(config.demoConfig.includePaths)
      }).on('error', sass.logError))
      .pipe(prefix(['last 1 version', '> 1%', 'ie 10']))
      .pipe(sourcemaps.init())
      .pipe(cleanCSS())
      .pipe(sourcemaps.write((config.demoConfig.sourceMapEmbed) ? null : './'))
      .pipe(gulpif(config.demoConfig.flattenDestOutput, flatten()))
      .pipe(gulp.dest(config.demoConfig.dest))
      .on('end', function () {
        done();
      });
    }

    gulp.task('demo', 'Compile Scss to CSS using Libsass with Autoprefixer and SourceMaps', cssCompile);

    gulp.task('clean:demo', 'Delete compiled CSS files', function (done) {
      del([
        config.demoConfig.dest + '*.{css,css.map}'
      ]).then(function () {
        done();
      });
    });

    gulp.task('validate:demo', 'Lint Scss files', function () {
      var src = config.demoConfig.src;
      if (config.demoConfig.lint.extraSrc) {
        src = src.concat(config.demoConfig.lint.extraSrc);
      }
      return gulp.src(src)
      .pipe(cached('validate:demo'))
      .pipe(sassLint())
      .pipe(sassLint.format())
      .pipe(gulpif(config.demoConfig.lint.failOnError, sassLint.failOnError()));
    });

    /*gulp.task('docs:demo', 'Build CSS docs using SassDoc', function () {
      return gulp.src(config.demoConfig.src)
      .pipe(sassdoc({
        dest: config.demoConfig.sassdoc.dest,
        verbose: config.demoConfig.sassdoc.verbose,
        basePath: config.demoConfig.sassdoc.basePath,
        exclude: config.demoConfig.sassdoc.exclude,
        theme: config.demoConfig.sassdoc.theme,
        sort: config.demoConfig.sassdoc.sort
      }));
    });*/

    /*gulp.task('clean:docs:demo', 'Delete compiled CSS docs', function (done) {
      del([
        config.demoConfig.sassdoc.dest
      ]).then(function () {
        done();
      });
    });*/

    gulp.task('watch:demo', function () {
      var tasks = ['demo'];
      if (config.demoConfig.lint.enabled) {
        tasks.push('validate:demo');
      }
      /*if (config.demoConfig.sassdoc.enabled) {
        tasks.push('docs:demo');
      }*/
      return gulp.watch(config.demoConfig.src, tasks);
    });

    tasks.watch.push('watch:demo');

    var cssDeps = [];

    gulp.task('css:demo', false, cssDeps, cssCompile);

    if (config.demoConfig.lint.enabled) {
      tasks.validate.push('validate:demo');
    }

    /*if (config.demoConfig.sassdoc.enabled) {
      tasks.compile.push('docs:demo');
      tasks.clean.push('clean:docs:demo');
    }*/

    tasks.clean.push('clean:demo');

  };

})();
