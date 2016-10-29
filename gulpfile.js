const del = require('del')
const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const concat = require('gulp-concat')
const connect = require('gulp-connect')
const moduleImporter = require('sass-module-importer')
const runSequence = require('run-sequence')

const paths = {
  dest: 'dist',
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
const moduleImporterOptions = { basedir: __dirname }
var sassOptions = { importer: moduleImporter(moduleImporterOptions) }

// -------------------------------------
// Build
// -------------------------------------
gulp.task('build', (cb) => {
  runSequence(
    'clean',
    [
      'build:html',
      'build:styles',
      'build:js',
    ],
    'build:selectors',
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
  const sass = require('gulp-sass')
  const minifyCSS = require('gulp-minify-css')
  return gulp.src(paths.styles.src)
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(connect.reload())
})

gulp.task('build:js', (cb) => {
  const uglify = require('gulp-uglify')
  return gulp.src(paths.js.src)
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.js.dest))
    .pipe(connect.reload())
})

gulp.task('build:selectors', (cb) => {
  const ignores = {
    classes: ['docs-*'],            // ignore these class selectors,
  }

  const selectors = require('gulp-selectors')
  return gulp.src(paths.dest + '/**/*.*', { base: './' })
    .pipe(selectors.run(null, ignores))
    .pipe(gulp.dest('.'))
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
    'build',
    'watch',
    'serve',
    cb
  )
})
