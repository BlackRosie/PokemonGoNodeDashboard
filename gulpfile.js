// Gulpfile.js
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var pm2 = require('pm2');
var pug = require('gulp-pug');
var open = require('open');

var shell = require('gulp-shell');


gulp.task('lint', function() {
    gulp.src('./**/*.js')
        .pipe(jshint());
});

gulp.task('install_dependencies', shell.task([
    'npm install',
    'cd submodules',
    'npm install'
]));

gulp.task('less', function() {
    gulp.src('./src/less/app.less')
        .pipe(less())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function() {
    gulp.watch('./src/less/**/*', ['less']);
    gulp.watch('./views/**/*.pug', ['pug']);
});

gulp.task('apply-prod-environment', function() {
    //var mode = 'production'
    var mode = 'debug';
    // process.env.NODE_ENV = 'production';
    process.env.NODE_ENV = mode;
    process.env.PORT = 3000;
    process.env.DEBUG = 'Rollbar:*';
    process.stdout.write("Successfully set NODE_ENV to " + mode + "\n");
});

gulp.task('pug', function() {
    return gulp.src('./views/**/*.pug');
});

gulp.task('start', function() {
    if (process.env.NODE_ENV === 'production') {
        console.log('starting server in PRODUCTION mode');
        pm2.connect(function(err) {
            if (err) {
                console.error(err);
                process.exit(2);
            }
            pm2.start({
                name: 'PokemonGoNodeDashboard',
                script: './app.js', // Script to be run
                exec_mode: 'cluster', // Allow your app to be clustered
                instances: 4, // Optional: Scale your app by 4
                max_memory_restart: '100M' // Optional: Restart your app if it reaches 100Mo
            }, function(err, apps) {
                pm2.disconnect();
            });
        });
    } else {
        console.log('starting server in DEVELOPMENT mode');
        nodemon({
                script: './app.js',
                ext: 'html js',
                ignore: ['ignored.js'],
                debug: true
            })
            .on('restart', function() {
                console.log('restarted!');
            });
    }
});

gulp.task('default', ['install_dependencies', 'watch', 'apply-prod-environment', 'start'], function() {
    open('http://localhost:3000', function(err) {
        if (err) throw err;
        console.log('The user closed the browser');
    });



});
