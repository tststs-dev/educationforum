/**
 * Created by Stas on 29.07.2017.
 */
const gulp = require('gulp');
const fs = require('fs');
const GulpSSH = require('gulp-ssh');
const config = require('config');

const branchName = 'in-progress';

let gulpConfig = {
    host: '207.154.247.61',
    username: 'stas',
    passphrase: 'forum1488',
    privateKey: fs.readFileSync('./.ssh/private.ppk'),
};

let gulpSSH = new GulpSSH({
    ignoreErrors: true,
    sshConfig: gulpConfig
});

gulp.task('run-pull', function() {
    return gulpSSH
        .exec('cd ' + config.serverFolder + '&& cd educationforum && git config credential.helper store && git fetch && git pull')
        .pipe(gulp.dest('logs'));
});

gulp.task('run-install-packages', function() {
    return gulpSSH
        .exec('cd ' + config.serverFolder + '&& cd educationforum && npm i --silent')
        .pipe(gulp.dest('logs'));
});

gulp.task('run-build', function() {
    return gulpSSH
        .exec('cd ' + config.serverFolder + '&& cd educationforum && npm run build')
        .pipe(gulp.dest('logs'));
});

gulp.task('run-restart-server', function() {
    return gulpSSH
        .exec('cd ' + config.serverFolder + '&& cd educationforum && ng build && pm2 restart ' + config.pm2name)
        .pipe(gulp.dest('logs'));
});

gulp.task('switch-story-branch', function() {
    return gulpSSH
        .exec('cd story && cd educationforum && git config credential.helper store && git fetch && git checkout ' + branchName)
        .pipe(gulp.dest('logs'));
});

gulp.task('run-bbg-deploy', ['run-pull', 'run-install-packages', 'run-build', 'run-restart-server']);
