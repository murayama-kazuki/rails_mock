var gulp = require('gulp');
var $ = require('gulp-load-plugins')({camelize: true});

var config = {
  path: {
    slim: 'app/template/slim/**/*.slim',
    rubysass: 'app/template/sass/',
    sass: 'app/template/sass/**/*.scss'
  },
  outpath: {
    html: 'app/public/views/',
    css: 'app/public/views/styles/'
  }
};

gulp.task('connect', function() {
  $.connect.server({
    root: './app/public/views',
    livereload: true
  });
});

var AUTO_PREFIXER = [
  'last 2version',
  'ie 8',
  'ie 7'
];

gulp.task('slim', function() {
  return gulp.src(config.path.slim)
  .pipe($.slim({
    pretty:true
  }))
  .pipe(gulp.dest(config.outpath.html))
  .pipe($.connect.reload());
});

gulp.task('sass', function() {
  return $.rubySass(config.path.rubysass)
  .pipe($.autoprefixer(AUTO_PREFIXER))
  .pipe(gulp.dest(config.outpath.css))
  .pipe($.connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(config.path.slim, ['slim']);
  gulp.watch(config.path.sass, ['sass']);
});

//gulp.task('serve', function(){

//});

gulp.task('serve', [
  'watch',
  'sass',
  'slim',
  'connect'
]);
