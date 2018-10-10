const syntax = 'scss';

const gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cleancss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require("gulp-notify"),
    nunjucksRender = require('gulp-nunjucks-render'),
    normalize = require('node-normalize-scss').includePaths,
    rsync = require('gulp-rsync'),
    babel = require('gulp-babel');

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false,
        open: false,
        // online: false, // Work Offline Without Internet Connection
        // tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
    })
});

gulp.task('styles', function () {
    return gulp.src('app/' + syntax + '/**/*.' + syntax + '')
        .pipe(sass({
            outputStyle: 'expanded',
            includePaths: require('node-normalize-scss').includePaths
        })
        .on("error", notify.onError()))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleancss({level: {1: {specialComments: 0}}})) // Opt., comment out when debugging
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream())
});

gulp.task('js', function () {
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js',
        'app/libs/slick/slick.min.js',
        'app/libs/object-fit-images/ofi.min.js',
        'app/libs/fancybox/jquery.fancybox.min.js',
        'app/js/common.js',
        ])
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('njk', function () {
    return gulp.src('app/templates/**/*.njk')
        .pipe(nunjucksRender({
            path: 'app/templates/',
            ext: '.html'
        }))
        .pipe(gulp.dest('app'))
});

gulp.task('rsync', function () {
    return gulp.src('app/**')
        .pipe(rsync({
            root: 'app/',
            hostname: 'username@yousite.com',
            destination: 'yousite/public_html/',
            // include: ['*.htaccess'], // Includes files to deploy
            exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
            recursive: true,
            archive: true,
            silent: false,
            compress: true
        }))
});

gulp.task('watch', ['styles', 'njk', 'js', 'browser-sync'], function () {
    gulp.watch('app/' + syntax + '/**/*.' + syntax + '', ['styles']);
    gulp.watch('app/templates/**/*.njk', ['njk']);
    gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
    gulp.watch('app/*.html', browserSync.reload)
});

gulp.task('default', ['watch']);
