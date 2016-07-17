var gulp = require('gulp'),
    gutil = require('gulp-util'),
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config');

// app/build/vendor.js consists of these modules. You don't need require them.
var vendor = [
    'angular',
    'angular-route',
    'angular-ui-router',
    'angular-resource'
];


gulp.task("watch", function () {
    gulp.start('webpack:watch');
});

gulp.task('webpack:watch', function (cb) {
    webpackConfig.plugins = webpackConfig.plugins.concat(
        new webpack.optimize.DedupePlugin()
        );
    webpackConfig.entry.vendor = vendor;
    var compiler = webpack(webpackConfig);

    compiler.watch({// watch options:
        aggregateTimeout: 300, // wait so long for more changes
        poll: true // use polling instead of native watchers
            // pass a number to set the polling interval
    }, function (err, stats) {
        if (err)
            throw new gutil.PluginError("webpack:build", err);
        gutil.log("[webpack:build]", stats.toString());
    });

});


gulp.task('default', function () {
    return console.log('Gulp is running!'.green.bold);
});
