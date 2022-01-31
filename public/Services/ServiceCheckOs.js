module.exports = function () {
    const fs = window.$vm.fs;
    const path = window.$vm.path;
    const root_dir = window.$vm.root_dir;
    const lodash = window.$vm.lodash;
    const env = {};
    const os = {
        macos: process.platform === 'darwin',
        linux: process.platform === 'linux',
        win32: process.platform === 'win32',
        php: fs.existsSync(path.join(root_dir, 'public', 'index.php')) || fs.existsSync(path.join(root_dir, 'index.php')),
        composer: fs.existsSync(path.join(root_dir, 'composer.json')),
        composer_installed: fs.existsSync(path.join(root_dir, 'vendor', 'composer', 'installed.json')),
        node: fs.existsSync(path.join(root_dir, 'package.json')),
        yarn: fs.existsSync(path.join(root_dir, 'yarn.lock')),
        git: fs.existsSync(path.join(root_dir, '.git')),
        phpstorm: fs.existsSync(path.join(root_dir, '.idea')),
        gitignore: fs.existsSync(path.join(root_dir, '.gitignore')),
    };
    fs.readFileSync(path.join(root_dir, '.env')).toString().split("\n").map((i) => {
        let matches = i ? /([A-Za-z0-9\-_]+)=(.*)/.exec(i) : null;
        if (matches && matches[1] && matches[2]) {
            process.env[matches[1]] = matches[2];
            env[matches[1]] = matches[2];
        }
    });
    let os_data = {
        env,
        composer: os.composer ? JSON.parse(fs.readFileSync(path.join(root_dir, 'composer.json')).toString()) : {},
        composer_lock: os.composer && fs.existsSync(path.join(root_dir, 'composer.lock')) ?
            JSON.parse(fs.readFileSync(path.join(root_dir, 'composer.lock')).toString()) : {},
        node: os.node ? JSON.parse(fs.readFileSync(path.join(root_dir, 'package.json')).toString()) : {},
    };

    let checkComposerList = {
        bfg_scaffold: 'bfg/scaffold',
        lte_admin: 'lte-admin',
        lte_ws: 'lte-admin',
        laravel: 'laravel/framework',
        laravel_fortify: 'laravel/fortify',
        laravel_sanctum: 'laravel/sanctum',
        laravel_breeze: 'laravel/breeze',
        laravel_dusk: 'laravel/dusk',
        laravel_horizon: 'laravel/horizon',
        laravel_jetstream: 'laravel/jetstream',
        laravel_octane: 'laravel/octane',
        laravel_passport: 'laravel/passport',
        laravel_sail: 'laravel/sail',
        laravel_scout: 'laravel/scout',
        laravel_socialite: 'laravel/socialite',
        laravel_telescope: 'laravel/telescope',
    };

    lodash.map(checkComposerList, (packageName, name) => {
        os[name] = !!(os.composer && (
            (os_data.composer.require && os_data.composer.require[packageName])
            || (os_data.composer['require-dev'] && os_data.composer['require-dev'][packageName])
        ));
    });

    let checkNodeList = {
        vue: 'vue',
        react: 'react',
        angular: '@angular/core',
        laravel_mix: 'laravel-mix',
    };

    lodash.map(checkNodeList, (packageName, name) => {
        os[name] = !!(os.node && (
            (os_data.node.dependencies && os_data.node.dependencies[packageName])
            || (os_data.node.devDependencies && os_data.node.devDependencies[packageName])
        ));
    });

    os.vue2 = os.vue
        && (
            /^([^\d]+|)2.*$/.test(os_data.node.dependencies['vue'])
            || /^([^\d]+|)2.*$/.test(os_data.node.devDependencies['vue'])
        );

    os.vue3 = os.vue
        && (
            /^([^\d]+|)3.*$/.test(os_data.node.dependencies['vue'])
            || /^([^\d]+|)3.*$/.test(os_data.node.devDependencies['vue'])
        );
    window.$vm.os = os;
    window.$vm.os_data = os_data;
    return os;
}
