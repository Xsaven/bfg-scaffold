import {ScaffoldConvertor} from "./scaffold_convertor";
const md5 = require('md5');
const fs = new (require('./fs'));
let timer = 0;

export default class Storage {
    reset () {
        this.clear();
        return window.location.reload();
    }
    clear () {
        return fs.put_contents(this.file, '{}');
    }

    setItem (key, value) {
        value = typeof value === 'string' ? value : JSON.stringify(value);
        if (timer) { clearTimeout(timer); }
        timer = setTimeout(() => {

            let oldHash = localStorage.getItem('old-hash');
            let oldHash2 = localStorage.getItem('old-hash-2');

            let newHash2 = md5(value);

            value = JSON.parse(value)

            let scaffold = Object.assign([], value.scaffold);
            //delete value.scaffold;

            let newData = JSON.stringify((new ScaffoldConvertor(scaffold)).items, null, ' ');
            let newHash1 = md5(JSON.stringify(scaffold));

            if (oldHash !== newHash1) {
                if (window.app) {
                    window.app.changed = true;
                    window.app.project_hash = newHash1;
                }
                localStorage.setItem('old-hash', newHash1);
                fs.put_contents(this.file_scaffold, newData);
                window.project_online.events.push({UpdateProjectScaffolds: [newHash1, scaffold]})
            }

            if (oldHash2 !== newHash2) {
                localStorage.setItem('old-hash-2', newHash2);
                fs.put_contents(this.file, JSON.stringify(value));
            }

        }, 150);
        return 1;
    }

    getItem () {
        return fs.get_contents(this.file);
    }

    get file () {
        return fs.pwd + '/.bfg-scaffold-config.json';
    }

    get file_scaffold () {
        return fs.pwd + '/database/scaffold.json';
    }
}
