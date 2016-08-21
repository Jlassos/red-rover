const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const runSequence = require('run-sequence')
const connect = require('gulp-connect')
const sass = require('gulp-sass')


const paths = {
  server: {
    root: 'dist'
  },
  html: {
    src: 'src/index.html',
    dest: 'dist',
    watch: 'src/**/*'
  },
  styles: {
    src: 'src/styles/main.scss',
    dest: 'dist/styles',
    watch: 'src/styles/**/*.scss'
  }
}
// -------------------------------------
// Build
// -------------------------------------
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
// -------------------------------------
// Clean
// -------------------------------------
gulp.task('clean:html', (cb) => {
  del.sync(paths.html.dest + '/index.html')
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
gulp.task('watch:html', () => {
  gulp.watch(paths.html.watch, ['build:html'])
})

gulp.task('watch:styles', () => {
  gulp.watch(paths.styles.watch, ['build:styles'])
})
// -------------------------------------
// Default
// -------------------------------------
gulp.task('default', (cb) => {
  runSequence(
    'clean:html',
    'build:html',
    'build:styles',
    'watch:html',
    'watch:styles',
    'serve',
    cb
  )
})