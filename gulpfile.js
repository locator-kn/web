'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var ts = require('gulp-typescript');
var notifier = require('node-notifier');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge2');
var server = require('gulp-server-livereload');
var typescript15 = require('typescript');
var template = require('gulp-template');
var url = require('url');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var inject = require('gulp-inject');
var concat = require('gulp-concat');
var Cachebuster = require('gulp-cachebust');
var cachebust = new Cachebuster();
var fs = require('fs');

var intervalMS = 500;

var templateObject = {};

var envData;


var _envData = fs.readFileSync('./env.json', 'utf-8');
envData = JSON.parse(_envData);
console.log(envData.keen)
templateObject.keenProjectId = envData.keen.PROJECT_ID;
templateObject.keenWriteKey = envData.keen.WRITE_KEY;

var tsProjectEmily = ts.createProject({
    declarationFiles: true,
    noExternalResolve: false,
    module: 'commonjs',
    target: 'ES5',
    noEmitOnError: false,
    out: 'js/app.js',
    typescript: typescript15
});


gulp.task('default', ['compile']);


gulp.task('ts', function () {

    intervalMS = process.argv.indexOf('--highcpu') !== -1 ? 200 : intervalMS;
    var live = process.argv.indexOf('--live') !== -1;
    var baseIdx = process.argv.indexOf('--base');
    var production = process.argv.indexOf('--production');
    var baseUrl = '';
    if (baseIdx !== -1) {
        baseUrl = process.argv[baseIdx + 1];
    }


    if(production !== -1) {
        live = true;
        baseIdx = 1;
        baseUrl = '/api/v1';
    }
    templateObject.live = live || '';
    templateObject.basePath = baseUrl || 'http://localhost:3001/api/v1';

    var realtimeUrl = url.parse(templateObject.basePath);
    var port = parseInt(realtimeUrl.port, 10) + 1;
    if(baseIdx === -1) {

        templateObject.basePathRealtime = url.parse(realtimeUrl.protocol + '//' + realtimeUrl.hostname + ':' + port + realtimeUrl.path + '/r').href;
    } else {
        templateObject.basePathRealtime = templateObject.basePath + '/r';
    }



    console.log(templateObject);
    var tsResult = gulp.src(['./www-develop/**/*.ts', '!./www-develop/lib/components/**/*.ts'])
        .pipe(template(templateObject).on('error', console.error.bind(console)))
        .pipe(sourcemaps.init())
        .pipe(ts(tsProjectEmily));

    tsResult._events.error[0] = function (error) {
        if(!error.__safety || !error.__safety.toString) {
            return;
        }
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
    return gulp.src('www')
        .pipe(server({
            livereload: {
                enable: false,
                filter: function (filePath, cb) {
                    cb(!(/lib/.test(filePath)));
                },
                port: 3003
            },
            directoryListing: false,
            open: true
        }));
});

gulp.task('locale', function () {
    gulp.src('./www-develop/locale/**/*').pipe(gulp.dest('./www/locale'));
});

gulp.task('sounds', function () {
    gulp.src('./www-develop/sounds/**/*').pipe(gulp.dest('./www/sounds'));
});

gulp.task('css', function () {
    var cssmin = process.argv.indexOf('--cssmin') !== -1;
    if(cssmin) {
        return gulp.src('./www-develop/**/*.css')
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(minifyCss({compatibility: 'ie8'}))
            .pipe(gulp.dest('./www'));
    } else {
        return gulp.src('./www-develop/**/*.css')
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(gulp.dest('./www'));
    }

});

gulp.task('html', function () {
    return gulp.src('./www-develop/**/*.html').pipe(gulp.dest('./www'));
});

gulp.task('lib', function () {
    return gulp.src('./www-develop/lib/**/*').pipe(gulp.dest('./www/lib'));
});

gulp.task('img', function () {
    return gulp.src('./www-develop/images/**/*').pipe(gulp.dest('./www/images'));
});

gulp.task('watch', ['ts', 'html', 'lib', 'img', 'css', 'locale', 'sounds'], function () {
    gulp.watch('./www-develop/**/*.ts', { interval: intervalMS }, ['ts']);
    gulp.watch('./www-develop/**/*.css', { interval: intervalMS }, ['css']);
    gulp.watch('./www-develop/**/*.html', { interval: intervalMS }, ['html']);
    gulp.watch('./www-develop/lib/**/*', { interval: intervalMS }, ['lib']);
    gulp.watch('./www-develop/locale/**/*', { interval: intervalMS }, ['locale']);
    gulp.watch('./www-develop/images/**/*', { interval: intervalMS }, ['img']);

    gulp.start('serve');
});


gulp.task('responsiveCss', function () {
    return gulp.src('./www-develop/css/responsive.css').pipe(gulp.dest('./www/css'));
});

gulp.task('install', function () {
    return bower.commands.install()
        .on('log', function (data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('compile', ['ts', 'html', 'lib', 'img', 'locale', 'responsiveCss', 'sounds'], function() {
    var target = gulp.src('./www-develop/index.html');
    var sources1 = gulp.src(['./www-develop/css/**/*.css', '!./www-develop/css/response.css'])
        .pipe(concat('css/all.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(cachebust.resources())
        .pipe(gulp.dest('./www'));

    return target.pipe(inject(sources1,  {ignorePath: 'www', addRootSlash: false})).pipe(gulp.dest('./www'));
});
