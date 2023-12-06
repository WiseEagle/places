'use strict';

/*const gulp = require('gulp');
const gp = require('gulp-load-plugins')();
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();*/

global.$ = {
    gulp: require('gulp'),
    gp: require('gulp-load-plugins')(),
    sass: require('gulp-sass')(require('sass')),
    bs: require('browser-sync').create(),
    path: {
        tasks: require('./gulp/config/tasks')
    }
};

[
    "./gulp/tasks/pug",
    "./gulp/tasks/serve",
    "./gulp/tasks/scss",
    "./gulp/tasks/watch",
    "./gulp/tasks/scripts"
].forEach(function (taskPath) {
    require(taskPath)();
})
/*$.path.tasks.forEach(function(taskPath){
    require(taskPath)();
})*/

$.gulp.task("default",$.gulp.series(
    $.gulp.parallel('pug','styles',"scripts:lib","scripts"),
    $.gulp.parallel("watch","serve")
));