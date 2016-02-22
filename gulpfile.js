//===============================================
// ПЕРЕМЕННЫЕ
//===============================================

var
    gulp = require('gulp'),
    cssGlobbing = require('gulp-css-globbing'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    rename = require("gulp-rename"),
    minifyCss = require('gulp-minify-css'),
    changed = require('gulp-changed'),
    uglify = require('gulp-uglify'),
    runSequence = require('gulp-run-sequence'),
    del = require('del'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    wiredep = require('wiredep').stream,
    gulpif = require('gulp-if'),
    useref = require('gulp-useref'),
    jade = require('gulp-jade'),
    pipe = require('multipipe'),
    cache = require('gulp-cached'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    lazypipe = require('lazypipe'),
    spritesmith = require('gulp.spritesmith'),
    merge = require('merge-stream');

//===============================================
// ПУТИ
//===============================================

var paths = {

    scriptsDev: 'app/js/',
    scriptsDist: 'dist/js/',
    spriteDev: 'app/resources/i/sprite/',
    imgDev: 'app/resources/i/',
    scss: 'app/scss/',
    stylesDist: 'dist/css/',
    jade: 'app/jade/'

};

//===============================================
// ЗАДАЧИ
//===============================================

// генерирует спрайт
gulp.task('sprite', function () {

    var spriteData = gulp.src(paths.spriteDev + '*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        imgPath: '../i/sprite.png',
        cssName: '_sprite.scss',
        cssFormat: 'scss',
        cssVarMap: function(sprite) {
            sprite.name = 's-' + sprite.name
        },
        cssTemplate: 'handlebarsInheritance.scss.handlebars'
    }));

    var imgStream = spriteData.img.pipe(gulp.dest(paths.imgDev));
    var scssStream = spriteData.css.pipe(gulp.dest(paths.scss + 'helpers'));

    return merge(imgStream, scssStream);

});

// Компилируем scss и кладем его в dist/css
gulp.task('sass', function() {

    return gulp.src(paths.scss + 'main.scss')
        .pipe(cssGlobbing({
            extensions: ['.scss']
        }))
        .pipe(sourcemaps.init())
            .pipe(sass()
                .on('error', sass.logError))
            .pipe(prefix("last 2 version", "> 1%", "ie 9", "ie 8"))
        .pipe(sourcemaps.write())
        .pipe(rename('styles.css'))
        .pipe(gulp.dest(paths.stylesDist));

});

// Компилирует jade
gulp.task('jade', function() {

    return gulp.src(paths.jade + 'pages/*.jade')
        .pipe(plumber())
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('dist'));

});

// Подключает bower файлы к html файлам
gulp.task('wiredep', function() {

    return gulp.src('dist/*.html')
        .pipe(wiredep())
        .pipe(gulp.dest('dist'));

});

// Склеивает и минифицирует все bower скрипты и стили, а также прописывает путь к новым файлам в html страницах
gulp.task('useref', function () {

    return gulp.src('dist/*.html')
        .pipe(useref({}, lazypipe().pipe(sourcemaps.init, { loadMaps: true })))
        .pipe(cache('useref'))
        .pipe(gulpif('*.js', pipe(
            // убирает суффикс .min и сохраняет не минифицированную версию
            rename(function (path) {
                path.basename = path.basename.slice(0, path.basename.length - 4);
            }),
            gulp.dest('dist'),
            uglify(),
            rename({suffix: '.min'}), // снова добавляет суффикс .min
            sourcemaps.write()
        )))
        .pipe(gulpif('*.css', pipe(
            minifyCss(),
            sourcemaps.write()
        )))
        .pipe(gulp.dest('dist'));

});

// Копируем всё из папки resources в dist
gulp.task('copy', function() {

    return gulp.src('app/resources/**/*')
        .pipe(changed('dist'))
        .pipe(gulp.dest('dist'));

});

// Очищаем папку dist
gulp.task('clean', function() {

    return del('dist');

});

// Сервер
gulp.task('server', function () {
    browserSync({
        port: 9000,
        server: {
            baseDir: 'dist',
            routes: {
                "/app": "app"
            }
        }
    });
});

//Watch task
gulp.task('watch', function() {

    global.watch = true;

    watch(paths.scss + '**/*.scss', function() {
        runSequence('sass', browserSync.reload);
    });

    watch(paths.jade + '**/*.jade', function() {
        runSequence('jade', browserSync.reload);
    });

    watch(paths.scriptsDev + '**/*.js', browserSync.reload);

    watch('app/resourses/**/*', function(event) {

        if (event) {
            runSequence('copy', browserSync.reload);
        }

    });

    watch(paths.spriteDev + '/**/*.png', function(event) {

        if (event) {
            runSequence('sprite', 'copy');
        }

    });

    watch('bower.json', function() {
        runSequence('wiredep', browserSync.reload);
    });

});

// Сборка на продакшн
gulp.task('build', ['clean'], function() {
    runSequence(
        'jade',
        'sprite',
        'wiredep',
        'copy',
        'sass',
        'useref'
    );
});

// Задача по умолчанию
gulp.task('default', ['clean'], function() {
    runSequence(
        'jade',
        'sprite',
        'wiredep',
        'copy',
        'sass',
        'server',
        'watch'
    )
});

