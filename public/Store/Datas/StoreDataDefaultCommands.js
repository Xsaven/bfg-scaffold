module.exports = [
    'php artisan scaffold -f',
    'php artisan migrate:fresh --seed',
    'composer dump-autoload',
    'sail artisan scaffold -f',
    'sail artisan migrate:fresh --seed',
    'sail composer dump-autoload',
    'cs_fixer',
];
