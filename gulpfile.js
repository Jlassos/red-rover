const del = require('del')
const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const concat = require('gulp-concat')
const webserver = require('gulp-webserver')
const cleanCSS = require('gulp-clean-css')
const sass = require('gulp-sass')
const uglify = require('gulp-uglify')
const runSequence = require('run-sequence')

const paths = {
  server: {
    root: 'dist',
  },
  html: {
    src: 'src/**/*.html',
    dest: 'dist',
    watch: 'src/**/*.html',
  },
  styles: {
    src: 'src/styles/**/*.scss',
    dest: 'dist/styles',
    watch: 'src/styles/**/*.scss',
  },
  fonts: {
    src: ['node_modules/font-awesome/fonts/**/*.*'],
    dest: 'dist/fonts',
    watch: 'src/fonts/**/*.*',
  },
  js: {
    src: 'src/js/**/*.js',
    dest: 'dist/js',
    watch: 'src/js/**/*',
  },
}

// -------------------------------------
// Build
// -------------------------------------
gulp.task('build', (cb) => {
  runSequence(
    'clean',
    [
      'build:html',
      'build:fonts',
      'build:styles',
      'build:js',
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
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest(paths.html.dest))
})

gulp.task('build:styles', () => {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.styles.dest))
})

gulp.task('build:js', (cb) => {
  return gulp.src(paths.js.src)
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.js.dest))
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
      open: true,
    }))
})
// -------------------------------------
// Watch
// -------------------------------------
gulp.task('watch', (cb) => {
  runSequence(
    'watch:html',
    'watch:styles',
    'watch:js',
    cb
  )
})
gulp.task('watch:html', (cb) => {
  gulp.watch(paths.html.watch, ['build:html'])
  cb()
})
gulp.task('watch:fonts', (cb) => {
  gulp.watch(paths.fonts.watch, ['build:fonts'])
  cb()
})
gulp.task('watch:styles', (cb) => {
  gulp.watch(paths.styles.watch, ['build:styles'])
  cb()
})
gulp.task('watch:js', (cb) => {
  gulp.watch(paths.js.watch, ['build:js'])
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
