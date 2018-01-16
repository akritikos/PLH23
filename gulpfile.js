'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var path = require('path');
var del = require('del');

gulp.task('sass', function () {
	return gulp.src(['**/src/sass/*.{sc,sa,c}ss'])
		.pipe(rename(function (path) {
			var temp = path.dirname.slice(0, -8);
			path.dirname = temp + 'assets/css';
		}))
		.pipe(autoprefixer({browsers: ['last 2 versions']}))
		.pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
		.pipe(gulp.dest('.'))
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: 'compressed', sourceMap: 'true' }).on('error', sass.logError))
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write('.',{includeContent:false}))
		.pipe(gulp.dest('.'))
});

gulp.task('script', function () {
	return gulp.src('**/src/js/*.js')
		.pipe(rename(function (path) {
			var temp = path.dirname.slice(0, -6);
			path.dirname = temp + 'assets/js';
		}))
		.pipe(gulp.dest('.'))
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write('.',{includeContent:false}))
		.pipe(gulp.dest('.'))
});

gulp.task('watch', function () {
	gulp.watch(['**/src/sass/*.{sc,ca,c}ss']).on('change',gulp.task('sass'));
	gulp.watch('**/src/js/*.js').on('change',gulp.task('script'));
});

gulp.task('clean', function(){
	return del([
		'**/assets/css/*.{css,map}',
		'**/assets/js/*.js'
	]);
});

gulp.task('default', gulp.series('clean', gulp.parallel('sass','script'),'watch'));
