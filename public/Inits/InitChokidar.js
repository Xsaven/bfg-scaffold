module.exports = function () {
    return window.$vm.chokidar.watch(window.$vm.root_dir, {
        persistent: true,
        ignoreInitial: true,
        ignored: [
            /node_modules/,
            /vendor/,
            /.bfg-scaffold-config.json/,
            /database\/scaffold.json/,
            /storage\/packages.php/,
            /storage\/framework/,
            /storage\/logs/,
        ]
    })
        .on('all', (event, path) => window.$vm.emit.chokidar('all', path, event))
        .on('add', path => window.$vm.emit.chokidar('add', path, 'add'))
        .on('change', path => window.$vm.emit.chokidar('change', path, 'change'))
        .on('unlink', path => window.$vm.emit.chokidar('unlink', path, 'unlink'))
        .on('addDir', path => window.$vm.emit.chokidar('addDir', path, 'addDir'))
        .on('unlinkDir', path => window.$vm.emit.chokidar('unlinkDir', path, 'unlinkDir'));
}
