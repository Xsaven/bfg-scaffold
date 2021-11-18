<template>
    <span>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                    <v-icon v-if="!loading || !connect" text :class="{'red--text': !online || !connect, 'green--text': online && connect}" @click="connect=!connect">
                        mdi-moon-full
                    </v-icon>
                    <v-progress-circular
                        v-else
                        :size="22"
                        :width="3"
                        :color="online ? 'green' : 'red'"
                        indeterminate
                        @click="connect=!connect"
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
            events: [],
            moveTime: 0
        }
    },
    mounted() {
        window.saved = false;
        window.project_online = this;
        this.key = Buffer.from(`${window.env.APP_NAME};${window.env.APP_KEY}`).toString('base64');
        this.runTimer();
        if (window.iohook) {
            let ioHook = window.iohook;
            ioHook.on('keydown', () => this.setStop());
            ioHook.on('keyup', () => this.setStop('keyup'));
            ioHook.on('mouseclick', () => this.setStop('mouseclick'));
            ioHook.on('mousedown', () => this.setStop());
            ioHook.on('mouseup', () => this.setStop());
            ioHook.on('mousedrag', () => this.setStop());
            ioHook.on('mousewheel', () => this.setStop('mousewheel'));
            ioHook.on('mousemove', () => this.setStop('mousemove'));
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
        },
        connect: {
            get () { return this.$store.state.connect},
            set (value) {this.$store.commit('setState', ['connect', value])},
        },
    },
    methods: {
        setStop (event = false) {
            this.stop = 60;
            if (event) {
                if (event === 'mousemove' || event === 'mousewheel') {
                    if (this.moveTime) clearTimeout(this.moveTime);
                    this.moveTime = setTimeout(() => {
                        window.project_online.events.push({SetHook: event})
                    }, 50);
                } else {
                    window.project_online.events.push({SetHook: event})
                }
            }
        },
        runTimer () {
            if (!this.timer) {
                this.setTime();
                this.timer = setInterval(this.setTime, 1000);
            }
        },
        ping () {
            if (localStorage.getItem('server_url') && localStorage.getItem('server_api_key') && this.key && this.connect) {
                if (this.online) {
                    //if (this.events.length) console.log(this.events);
                    if (this.stop > 0) {
                        this.events.push({AddSecond: []});
                    }
                    axios().post(`/api/user/ping/${this.key}`, {
                        events: Object.assign([], this.events)
                    }).then(({data}) => {
                        this.totalSeconds = data.data.project_sec;
                        if (!data.data.project_hash || !this.project_hash) {
                            this.changed();
                            localStorage.setItem('old-hash', '');
                        } else if (this.project_hash && data.data.project_hash && this.project_hash !== data.data.project_hash) {
                            if (!window.saved) {
                                window.project_online.events.push({GetProjectScaffolds: []})
                            } else {
                                window.saved = false;
                            }
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
            if (this.connect) {
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
