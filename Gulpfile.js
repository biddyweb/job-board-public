var gulp = require('gulp')
  , gutil = require('gulp-util')
  , styl = require('gulp-styl')
  , inline = require('rework-inline')
  , csso = require('gulp-csso')
  , uglify = require('gulp-uglify')
  , jade = require('gulp-jade')
  , coffee = require('gulp-coffee')
  , browserify = require('gulp-browserify')
  , concat = require('gulp-concat')
  , livereload  = require('gulp-livereload') // Livereload plugin needed: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
  , tinylr = require('tiny-lr')
  , express = require('express')
  , app = express()
  , marked = require('marked') // For :markdown filter in jade
  , path = require('path')
  , server = tinylr()
  , es = require('event-stream');
 
 
// --- Basic Tasks ---
gulp.task('css', function() {
  return gulp.src('src/assets/stylesheets/*.styl').
    pipe( styl( { whitespace: true } ) ).
    pipe( csso() ).
    pipe( gulp.dest('dist/assets/stylesheets/') ).
    pipe( livereload( server ));
});

gulp.task('coffee', function() {
  return gulp.src('src/assets/scripts/*.coffee').
    pipe( coffee() ).
    //pipe( browserify({insertGlobals : true, debug : true}) ).
    pipe( gulp.dest('src/assets/scripts/generated')).
    pipe( livereload( server ));
});    

gulp.task('browserify', function() {
  return gulp.src('src/assets/scripts/*.js').
    pipe( browserify( {debug : true}) ).    
    pipe( gulp.dest('dist/assets/scripts/')).
    pipe( livereload( server ));
});
 
gulp.task('templates', function() {
  return gulp.src('src/*.jade').
    pipe(jade({
      pretty: true
    })).
    pipe(gulp.dest('dist/')).
    pipe( livereload( server ));
});

gulp.task('express', function() {
  app.use(express.static(path.resolve('./dist')));
  app.listen(1337);
  gutil.log('Listening on port: 1337');
});
 
gulp.task('watch', function () {
  server.listen(35729, function (err) {
    if (err) return console.log(err);
 
    gulp.watch('src/assets/stylesheets/*.styl',['css']);
    gulp.watch('src/assets/scripts/*.js',['browserify']);
    gulp.watch('src/*.jade',['templates']);
    
  });
});
 
// Default Task
gulp.task('default', ['browserify','css','templates','express','watch']);