module.exports = class Server {
    constructor() {
        this.online = false;
        this.axios = window.$vm.axios;
        this.emits = [];
        (new window.$vm.services.storage_event_listeners(this))
            .create();
    }

    createInstance () {
        return this.axios.create({
            baseURL: this.url,
            timeout: 1000,
            headers: this.headers
        });
    }

    csrf () {
        return this.createInstance().get('/sanctum/csrf-cookie').then(r => {
            this.online = true;
            return r;
        }).catch(r => {
            this.online = false;
            return r;
        })
    }

    ping () {
        let promiseResult = this.createInstance()
            .post(`/api/user/ping/${this.hash}`, {
                events: Object.assign([], this.emits)
            }).then(r => {
                this.online = true;
                if (r.data.data.events) {
                    r.data.data.events.map(i => {
                        document.dispatchEvent(new CustomEvent(`server:${i.name}`, {detail: i.detail}));
                    });
                }
                return r;
            }).catch(r => {
                this.online = false;
                return r;
            });
        this.emits = [];
        return promiseResult;
    }

    UpdateProjectScaffolds (hash, scaffold, ...params) {
        this.emit('UpdateProjectScaffolds', hash, scaffold, ...params)
    }

    AddFileEvent (eventName, path, task_id, ...params) {
        this.emit('AddFileEvent', eventName, path, task_id, ...params)
    }

    UpdateTaskList (...params) {
        this.emit('UpdateTaskList', ...params)
    }

    SetHook (eventName, task_id, ...params) {
        this.emit('SetHook', eventName, task_id, ...params)
    }

    AddSecond (speed, ...params) {
        this.emit('AddSecond', speed, ...params)
    }

    AddTaskSecond (task_id, speed, ...params) {
        this.emit('AddTaskSecond', task_id, speed, ...params)
    }

    emit (serverEvent, ...params) {
        this.emits.push({[serverEvent]: params});
        return this;
    }

    on (eventName, cb) {
        document.addEventListener(`server:${eventName}`, cb);
        return this;
    }

    off (eventName, cb) {
        document.removeEventListener(`server:${eventName}`, cb);
        return this;
    }

    get url () {
        return window.$vm.$store.state.global.server_url;
    }

    get key () {
        return window.$vm.$store.state.global.server_api_key;
    }

    get hash () {
        return Buffer
            .from(`${window.$vm.$store.state.local.os_data.env.APP_NAME};${window.$vm.$store.state.local.os_data.env.APP_KEY}`)
            .toString('base64');
    }

    get headers () {
        let headers = {
            'Access-Control-Allow-Origin': '*'
        };
        if (this.key) {
            headers['Authorization'] = `Bearer ${this.key}`;
        }
        return headers;
    }
}
