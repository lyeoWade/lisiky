var gulp = require('gulp'),
	less = require('gulp-less'),
	livereload = require('gulp-livereload');


gulp.task('testLess',function(){
	gulp.src('css/*.less')
		.pipe(less())
		.pipe(gulp.dest('css'))
		.pipe(livereload())
})


gulp.task('watch', function(){
	livereload.listen();
	gulp.watch('css/*.less',['testLess'])
});
