var gulp = require('gulp');
var less = require('gulp-less');
var shell = require('gulp-shell');

var paths = {
	built_modules: [
		'./bower_components/jquery/dist/jquery.min.js',
		'./bower_components/bootstrap/dist/js/bootstrap.min.js',
		'./bower_components/angular/angular.min.js',
		'./bower_components/angular-route/angular-route.min.js',
		'./bower_components/angular-bootstrap/ui-bootstrap.min.js',
		'./bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js'
	],
	modules: [
	],
	fonts: [
		'./bower_components/bootstrap/dist/fonts/*',
		'./bower_components/font-awesome/fonts/*'
	],
	styles: './src/styles/**/*.less',
	images: './src/images/*',
};

gulp.task('less', function () {
	return gulp.src(paths.styles)
		.pipe(less())
		.pipe(gulp.dest('./public/styles'));
});

gulp.task('images', function () {
	return gulp.src(paths.images)
		.pipe(gulp.dest('./public/images'));
});

gulp.task('fonts', function () {
	return gulp.src(paths.fonts)
		.pipe(gulp.dest('./public/fonts'));
});

gulp.task('build_modules', function () {

	if (!paths.modules.length)
		return;

	return gulp.src(paths.modules)
		.pipe(shell([
			'cd <%= file.path %>; npm install',
			'cd <%= file.path %>; grunt build'
		]));
});

gulp.task('modules', [ 'build_modules' ], function () {


	return gulp.src(paths.built_modules)
		.pipe(gulp.dest('./public/scripts'));
});

gulp.task('watch', function() {
	gulp.watch(paths.less, [ 'less' ]);
	gulp.watch(paths.images, [ 'images' ]);
	gulp.watch(paths.fonts, [ 'fonts' ]);
});

gulp.task('build', [ 'modules', 'less', 'fonts', 'images' ]);
