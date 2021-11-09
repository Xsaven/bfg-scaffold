const fs = window.fs;
const path = window.path;

function trim (str, charlist) {
    charlist = !charlist ? ' s\xA0' : charlist.replace(/([[\]().?/*{}+$^:])/g, '$1');
    let re = new RegExp('^[' + charlist + ']+|[' + charlist + ']+$', 'g');
    return str.replace(re, '');
}

function dirname (path) {
    return String(path).replace(/\\/g, '/')
        .replace(/\/[^/]*\/?$/, '');
}

module.exports = class Fs {

    read_all_dir (dir) {
        return fs.readdirSync(dir).reduce((files, file) => {
            const name = path.join(dir, file);
            const isDirectory = fs.statSync(name).isDirectory();
            return isDirectory ? [...files, ...this.read_all_dir(name)] : [...files, name];
        }, [])
    }

    read_dir (path) {
        if (Array.isArray(path)) path = this.path(...path);
        return fs.readdirSync(path);
    }

    stat (path) {
        if (Array.isArray(path)) path = this.path(...path);
        return fs.lstatSync(path);
    }

    exists (path) {
        if (Array.isArray(path)) path = this.path(...path);
        return fs.existsSync(path);
    }

    is_file (file) {
        if (Array.isArray(file)) file = this.path(...file);
        return this.exists(file) ? this.stat(file).isFile() : false;
    }

    is_link (path) {
        if (Array.isArray(path)) path = this.path(...path);
        return this.exists(path) ? this.stat(path).isSymbolicLink() : false;
    }

    is_dir (dir) {
        if (Array.isArray(dir)) dir = this.path(...dir);
        return this.exists(dir) ? this.stat(dir).isDirectory() : false;
    }

    mkdir (path) {
        if (Array.isArray(path)) path = this.path(...path);
        return fs.mkdirSync(path, { recursive: true });
    }

    put_contents (file, content) {
        if (Array.isArray(file)) file = this.path(...file);
        let dir = dirname(file);
        if (!this.is_dir(dir)) this.mkdir(dir);
        return fs.writeFileSync(file, content);
    }

    append_contents (path, data, options = {}) {
        if (Array.isArray(path)) path = this.path(...path);
        return fs.appendFileSync(path, data, options);
    }

    get_contents (file) {
        if (Array.isArray(file)) file = this.path(...file);
        if (this.is_file(file)) {
            return fs.readFileSync(file).toString();
        }
        return '';
    }

    get_json_contents (file) {
        if (Array.isArray(file)) file = this.path(...file);
        let json = [];
        if (this.is_file(file)) {
            try {json = JSON.parse(this.get_contents(file));} catch (e) {
                json = []
            }
        }
        return json;
    }

    path (...paths) {
        let result = trim(path.join(...paths), '/');
        return result === '.' ? '/' : "/" + result;
    }

    get pwd () {
        return window.root_dir;
    }
}
