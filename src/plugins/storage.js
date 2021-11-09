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

            let old = localStorage.getItem('old-hash');

            let newData = JSON.stringify((new ScaffoldConvertor(value)).items, null, ' ');

            fs.put_contents(this.file_scaffold, newData);

            newData = md5(newData);

            if (old !== newData) {
                if (window.app) window.app.changed = true;
                localStorage.setItem('old-hash', newData);
            }

            fs.put_contents(this.file, value);

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
