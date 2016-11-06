const del = require('del')
const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const concat = require('gulp-concat')
const webserver = require('gulp-webserver')
const cleanCSS = require('gulp-clean-css')
const plumber = require('gulp-plumber')
const sass = require('gulp-sass')
const uglify = require('gulp-uglify')
const iife = require('gulp-wrap-iife')
const runSequence = require('run-sequence')

const paths = {
  fonts: {
    src: ['node_modules/font-awesome/fonts/**/*.*'],
    dest: 'dist/fonts',
    watch: 'src/fonts/**/*.*',
  },
  html: {
    src: 'src/**/*.html',
    dest: 'dist',
    watch: 'src/**/*.html',
  },
  images: {
    src: 'src/images/**/*',
    dest: 'dist/images',
    watch: 'src/images/**/*.*',
  },
  js: {
    src: 'src/js/**/*.js',
    dest: 'dist/js',
    watch: 'src/js/**/*',
  },
  server: {
    root: 'dist',
  },
  styles: {
    src: 'src/styles/**/*.scss',
    dest: 'dist/styles',
    watch: 'src/styles/**/*.scss',
  },
}

// -------------------------------------
// Build
// -------------------------------------
gulp.task('build', (cb) => {
  runSequence(
    'clean',
    [
      'build:fonts',
      'build:html',
      'build:images',
      'build:js',
      'build:styles',
    ],
    cb
  )
})

gulp.task('build:fonts', () => {
  return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest))
})

gulp.task('build:html', () => {
  return gulp.src(paths.html.src)
    .pipe(plumber())
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest(paths.html.dest))
})
gulp.task('build:images', () => {
  return gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest))
})

gulp.task('build:js', (cb) => {
  return gulp.src(paths.js.src)
    .pipe(plumber())
    .pipe(iife())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.js.dest))
})

gulp.task('build:styles', () => {
  return gulp.src(paths.styles.src)
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.styles.dest))
})

// -------------------------------------
// Clean
// -------------------------------------
gulp.task('clean', (cb) => {
  del.sync('dist')
  cb()
})
// -------------------------------------
// Serve
// -------------------------------------
gulp.task('serve', (cb) => {
  return gulp.src(paths.server.root)
    .pipe(webserver({
      host: 'localhost',
      port: 8080,
      livereload: true,
    }))
})
// -------------------------------------
// Watch
// -------------------------------------
gulp.task('watch', (cb) => {
  runSequence(
    'watch:fonts',
    'watch:html',
    'watch:images',
    'watch:js',
    'watch:styles',
    cb
  )
})
gulp.task('watch:fonts', (cb) => {
  gulp.watch(paths.fonts.watch, ['build:fonts'])
  cb()
})
gulp.task('watch:html', (cb) => {
  gulp.watch(paths.html.watch, ['build:html'])
  cb()
})
gulp.task('watch:images', (cb) => {
  gulp.watch(paths.images.watch, ['build:images'])
  cb()
})
gulp.task('watch:js', (cb) => {
  gulp.watch(paths.js.watch, ['build:js'])
  cb()
})
gulp.task('watch:styles', (cb) => {
  gulp.watch(paths.styles.watch, ['build:styles'])
  cb()
})
// -------------------------------------
// Default
// -------------------------------------
gulp.task('default', (cb) => {
  runSequence(
    'build',
    'watch',
    'serve',
    cb
  )
})
