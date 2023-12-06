module.exports = function (){
    $.gulp.task("styles", function () {
        return $.gulp.src('src/static/scss/*.scss')
            .pipe($.gp.sourcemaps.init())
            .on("error", $.gp.notify.onError({
                title: "style"
            }))
            .pipe($.sass({outputStyle: 'compressed'}).on('error', $.sass.logError))
            .pipe($.gp.sourcemaps.write('.'))
            .pipe($.gulp.dest('build/css'))
            .pipe($.bs.reload({
                stream:true
            }));
    });

}