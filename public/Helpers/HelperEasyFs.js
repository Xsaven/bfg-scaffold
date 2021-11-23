module.exports = class Fs {

    constructor() {
        this.fs = window.$vm.fs;
        this.help = window.$vm.help;
        this.globalPath = window.$vm.path;
        this.root_dir = window.$vm.root_dir;
        this.dirname = window.$vm.help.dirname;
    }

    read_all_dir (dir) {
        return this.fs.readdirSync(dir).reduce((files, file) => {
            const name = this.globalPath.join(dir, file);
            const isDirectory = this.fs.statSync(name).isDirectory();
            return isDirectory ? [...files, ...this.read_all_dir(name)] : [...files, name];
        }, [])
    }

    read_dir (path) {
        if (Array.isArray(path)) path = this.path(...path);
        return this.fs.readdirSync(path);
    }

    stat (path) {
        if (Array.isArray(path)) path = this.path(...path);
        return this.fs.lstatSync(path);
    }

    exists (path) {
        if (Array.isArray(path)) path = this.path(...path);
        return this.fs.existsSync(path);
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
        return this.fs.mkdirSync(path, { recursive: true });
    }

    put_contents (file, content) {
        if (Array.isArray(file)) file = this.path(...file);
        let dir = this.dirname(file);
        if (!this.is_dir(dir)) this.mkdir(dir);
        return this.fs.writeFileSync(file, content);
    }

    append_contents (path, data, options = {}) {
        if (Array.isArray(path)) path = this.path(...path);
        return this.fs.appendFileSync(path, data, options);
    }

    get_contents (file) {
        if (Array.isArray(file)) file = this.path(...file);
        if (this.is_file(file)) {
            return this.fs.readFileSync(file).toString();
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
        let result = this.help.string_trim(this.globalPath.join(...paths), '/');
        return result === '.' ? '/' : "/" + result;
    }

    get pwd () {
        return this.root_dir;
    }
}
