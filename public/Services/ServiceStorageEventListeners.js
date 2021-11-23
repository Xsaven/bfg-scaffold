module.exports = class StorageEventListener {
    constructor(server, events = []) {
        this.server = server;
        this.events = [
            'setState', 'setLocalState', 'setTempState', 'setGlobalState',
            ...events
        ]
    }
    create () {
        this.events.map((event) => {
            this.server.on(event, ({detail}) => {
                window.$vm.store.commit(event, detail);
            });
        });
    }
}
