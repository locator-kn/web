var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var ts = require('gulp-typescript');
var path = require('path');
var notifier = require('node-notifier');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge2');
var shell = require('gulp-shell');
var server = require('gulp-server-livereload');
var typescript15 = require('typescript');


var tsProjectEmily = ts.createProject({
    declarationFiles: true,
    noExternalResolve: false,
    module: 'commonjs',
    target: 'ES5',
    noEmitOnError: false,
    out: 'js/app.js',
    typescript: typescript15
});

gulp.task('default', ['ts', 'html', 'css', 'lib', 'locale']);


gulp.task('ts', function () {
    var tsResult = gulp.src(['./www-develop/**/*.ts', '!./www-develop/lib/components/**/*.ts'])
        .pipe(sourcemaps.init())
        .pipe(ts(tsProjectEmily));

    tsResult._events.error[0] = function (error) {
        notifier.notify({
            'title': 'Compilation error',
            'message': error.__safety.toString(),
            sound: true
        });
    };
    return merge([
        tsResult.dts.pipe(gulp.dest('./www/definitions')),
        tsResult.js.pipe(gulp.dest('./www'))
    ]);
});

gulp.task('serve', function () {
    gulp.src('www')
        .pipe(server({
            livereload: {
                enable: true,
                filter: function (filePath, cb) {
                    cb(!(/lib/.test(filePath)));
                }
            },
            directoryListing: false,
            open: true
        }));
});

gulp.task('locale', function () {
    gulp.src('./www-develop/locale/**/*').pipe(gulp.dest('./www/locale'));
});

gulp.task('css', function () {
    gulp.src('./www-develop/**/*.css').pipe(gulp.dest('./www'));
});

gulp.task('html', function () {
    gulp.src('./www-develop/**/*.html').pipe(gulp.dest('./www'));
});

gulp.task('lib', function () {
    gulp.src('./www-develop/lib/**/*').pipe(gulp.dest('./www/lib'));
});

gulp.task('watch', ['ts', 'html', 'css', 'lib', 'locale'], function () {
    gulp.watch('./www-develop/**/*.ts', ['ts']);
    gulp.watch('./www-develop/**/*.css', ['css']);
    gulp.watch('./www-develop/**/*.html', ['html']);
    gulp.watch('./www-develop/locale/**/*', ['locale']);

    gulp.start('serve');
});


gulp.task('install', ['git-check'], function () {
    return bower.commands.install()
        .on('log', function (data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});


gulp.task('git-check', function (done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});
