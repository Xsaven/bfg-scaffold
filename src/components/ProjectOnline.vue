<template>
    <span>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                    <v-icon v-if="!loading" text :class="{'red--text': !online, 'green--text': online}">
                        mdi-moon-full
                    </v-icon>
                    <v-progress-circular
                        v-else
                        :size="22"
                        :width="3"
                        :color="online ? 'green' : 'red'"
                        indeterminate
                    ></v-progress-circular>
                </span>
            </template>
            <span>Project {{online ? 'online' : 'offline'}}</span>
        </v-tooltip>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on" class="ml-3">
                    {{timeLabel}}
                </span>
            </template>
            <span>Online time</span>
        </v-tooltip>
    </span>
</template>

<script>
const axios = require('../plugins/axios');
export default {
    name: 'project-online',
    props: {},
    data () {
        return {
            online: false,
            loading: !!localStorage.getItem('server_url'),
            totalSeconds: localStorage.getItem('total_seconds') ? localStorage.getItem('total_seconds') : 0,
            timeLabel: '00:00:00',
            key: null,
            stop: 60,
            timer: 0,
            events: []
        }
    },
    mounted() {
        window.project_online = this;
        this.key = Buffer.from(`${window.env.APP_NAME};${window.env.APP_KEY}`).toString('base64');
        this.runTimer();
        if (window.iohook) {
            let ioHook = window.iohook;
            ioHook.on('keydown', this.setStop.bind(this));
            ioHook.on('keyup', this.setStop.bind(this));
            ioHook.on('mouseclick', this.setStop.bind(this));
            ioHook.on('mousedown', this.setStop.bind(this));
            ioHook.on('mouseup', this.setStop.bind(this));
            ioHook.on('mousedrag', this.setStop.bind(this));
            ioHook.on('mousewheel', this.setStop.bind(this));
            ioHook.on('mousemove', this.setStop.bind(this));
            ioHook.start();
        }
    },
    watch: {
        totalSeconds (v) {
            localStorage.setItem('total_seconds', v);
        }
    },
    computed: {
        project_hash () {
            return this.$store.state.project_hash;
        }
    },
    methods: {
        setStop () {
            this.stop = 60;
        },
        runTimer () {
            if (!this.timer) {
                this.setTime();
                this.timer = setInterval(this.setTime, 1000);
            }
        },
        ping () {
            if (localStorage.getItem('server_url') && localStorage.getItem('server_api_key') && this.key) {
                if (this.online) {
                    if (this.events.length) console.log(this.events);
                    axios().post(`/api/user/ping/${this.key}`, {
                        events: Object.assign([], this.events)
                    }).then(({data}) => {
                        this.totalSeconds = data.data.project_sec;
                        if (!data.data.project_hash || !this.project_hash) {
                            this.changed();
                            localStorage.setItem('old-hash', '');
                        } else if (this.project_hash && data.data.project_hash && this.project_hash !== data.data.project_hash) {
                            window.project_online.events.push({GetProjectScaffolds: []})
                        }
                        if (data.data.events) {
                            data.data.events.map(i => {
                                document.dispatchEvent(new CustomEvent(i.name, {detail: i.detail}));
                            });
                        }
                    }).catch(() => {
                        this.online = false;
                    });
                    this.events = [];
                } else {
                    this.loading = true;
                    axios().get('/sanctum/csrf-cookie').then(() => {
                        this.online = true;
                    }).catch(() => {
                        this.online = false;
                    }).finally(() => {
                        this.loading = false;
                    });
                }
            } else {
                this.online = false;
                this.loading = false;
            }
        },
        setTime () {
            if (this.stop > 0) {
                this.stop--;
                this.timeLabel = new Date(this.totalSeconds * 1000).toISOString().substr(11, 8);
                if (!this.online) this.totalSeconds++;
                this.ping();
            }
        },
        pad(val) {
            let valString = val + "";
            if (valString.length < 2) {
                return "0" + valString;
            } else {
                return valString;
            }
        },
        changed () {
            this.$store.commit('setState', ['total', this.$store.state.total]);
        }
    }
}
</script>
