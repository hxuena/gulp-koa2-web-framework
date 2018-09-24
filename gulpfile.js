const gulp = require("gulp")
const babel = require('gulp-babel')
const watch = require('gulp-watch')
const rollup = require('gulp-rollup')
const replace = require('rollup-plugin-replace')
const gulpSequence = require('gulp-sequence')
const eslint = require('gulp-eslint')

gulp.task('builddev', () => {
  return watch('./src/nodeui/**/*.js', {
    ignoreInitial: false
  }, () => {
    gulp.src('./src/nodeui/**/*.js')
      .pipe(babel({
        //关闭外部的babelrc
        babelrc: false,
        "plugins": ["transform-es2015-modules-commonjs"]
      }))
      .pipe(gulp.dest('dist'))
  })
})

gulp.task('buildprod', () => {
  gulp.src('./src/nodeui/**/*.js')
    .pipe(babel({
      babelrc: false,
      ignore: ["./src/nodeui/config/*.js"],
      "plugins": ["transform-es2015-modules-commonjs"]
    }))
    .pipe(gulp.dest('dist'))
})

/**流清洗 */
gulp.task('configclean', () => {
  gulp.src('./src/nodeui/**/*.js')
    .pipe(rollup({
      output:{
        format: "cjs"
      },
      input: './src/nodeui/config/index.js',
      plugins: [
        replace({
          "process.env.NODE_ENV": JSON.stringify('production')
        })
      ]
    }))
    .pipe(gulp.dest('dist'))
})

gulp.task('lint', () => {
  gulp.src('./src/nodeui/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

let _task = ["builddev"]
if (process.env.NODE_ENV == "production") {
  /**
   * 将异步事件转入队列处理，使任务按顺序处理，
   * 即lint -> buildprod ->configclean
   */
  _task = gulpSequence("lint", "buildprod", "configclean") 
}
if (process.env.NODE_ENV == "lint") {
  _task =  ["lint"]
}
gulp.task("default", _task)
