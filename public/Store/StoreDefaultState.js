const storeDatas = require('./Datas');

module.exports = {
    rate: 0,
    total: 0,
    timer_pause: true,
    project_hash: null,
    selected_model: null,
    connect: true,
    show_model_list: true,
    show_page_list: true,
    show_task_list: true,
    scaffold: [],
    scaffold_changed: false,
    track_task: {},
    edit_task: null,
    track_task_id: 0,
    track_task_pause: false,
    model_tab: 0,
    global: {
        server_url: null,
        server_api_key: null,
        timer_speed: 1,
        php_path: null,
        composer_path: null,
        cs_fixer_path: './vendor/bin/php-cs-fixer fix',
        program_paths: {},
        pages: [], // For the future, pages for all projects (pined page).
        projects: [], // For the future, the list of projects that the user opened for all time.
        users: [], // For the future, if the user is authorized, it will go to the list of users between which it will be able to switch.
        ...storeDatas
    },
    local: {
        os: {},
        os_data: {},
        menu: true,
        online: false,
        total_seconds: 0,
        scaffold_hash: null,
        config_hash: null,
        task_trackers: {},
        commands: {
            rebuild: ['php artisan scaffold -f'],
            fresh: ['php artisan scaffold -f', 'php artisan migrate:fresh --seed', 'composer dump-autoload'],
        },
        pages: [],
        tasks: [],
    },
    temp: {
        seted_scaffold: false,
        last_child_report: [],
    },
    cmd: '',
    cmd_executing: false,
    watches: []
};
