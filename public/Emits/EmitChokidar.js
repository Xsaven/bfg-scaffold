module.exports = function (event, path, e) {
    let $store = window.$vm.$store;
    let root_dir = window.$vm.root_dir;
    let is = window.$vm.help.string_is;
    let check_os = window.$vm.services.check_os;
    let timers = {};

    if (
        event === 'all'
        && !is('.git*', path)
        && !is('.idea*', path)
    ) {
        window.$vm.server.AddFileEvent(e, String(path).replace(root_dir, ''), $store.state.track_task_id)
    }

    path = String(path).replace(root_dir+'/', '');

    if (
        is('composer.lock', path)
        || is('composer.json', path)
        || is('package.json', path)
        || is('yarn.lock', path)
        || is('.git', path)
        || is('.gitignore', path)
        || is('.env', path)
        || event === 'unlink'
        || event === 'addDir'
        || event === 'unlinkDir'
    ) {
        check_os();
    }
    $store.state.watches.map((i, k) => {
        if (i.file && is(i.file, path) && i.event === event) {
            if (timers[path]) {
                clearTimeout(timers[path]);
                delete timers[path];
            }
            timers[path] = setTimeout(() => {
                if (i.commands.length) {
                    window.$vm.child.exec(String(i.commands.join(' && ')).replace(/{path}/g, path)
                        .replace(/{event}/g, e));
                }
                i.touch++;
                $store.state.watches[k] = i;
                clearTimeout(timers[path]);
                delete timers[path];
            }, 200);
        }
    });
}
