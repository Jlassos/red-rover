const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const runSequence = require('run-sequence')
const connect = require('gulp-connect')
const sass = require('gulp-sass')

const paths = {
  server: {
    root: 'dist',
  },
  html: {
    src: 'src/index.html',
    dest: 'dist',
    watch: 'src/**/*',
  },
  styles: {
    src: ['src/styles/main.scss', 'src/styles/docs.scss'],
    dest: 'dist/styles',
    watch: 'src/styles/**/*.scss',
  },
  js: {
    src: 'src/js/*.js',
    dest: 'dist/js',
    watch: 'src/js/**/*',
  },
}
// -------------------------------------
// Build
// -------------------------------------
gulp.task('build', (cb) => {
  runSequence(
    'build:html',
    'build:styles',
    'build:js',
    cb
  )
})
gulp.task('build:html', () => {
  return gulp.src(paths.html.src)
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest(paths.html.dest))
    .pipe(connect.reload())
})

gulp.task('build:styles', () => {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(connect.reload())
})

gulp.task('build:js', (cb) => {
  return gulp.src(paths.js.src)
    .pipe(gulp.dest(paths.js.dest))
    .pipe(connect.reload())
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
  connect.server({
    root: paths.server.root,
    livereload: true
  })
  cb()
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
    'clean',
    'build',
    'watch',
    'serve',
    cb
  )
})
