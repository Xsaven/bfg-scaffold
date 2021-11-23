<template>
    <v-row>
        <v-col cols="5" class="pa-0 text-right" v-if="online">
            <v-row>
                <v-col cols="12" class="pa-0">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <span v-bind="attrs" v-on="on">
                                {{$vm.help.seconds_to_time(total_seconds)}}
                            </span>
                        </template>
                        <span>Online time</span>
                    </v-tooltip>
                </v-col>
                <v-col cols="12" v-if="rate && total_seconds" class="pa-0">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <span v-bind="attrs" v-on="on">
                                {{$vm.help.seconds_to_money(total_seconds ? total_seconds : 0, rate ? rate : 0)}} $
                            </span>
                        </template>
                        <span>Online time price</span>
                    </v-tooltip>
                </v-col>
            </v-row>
        </v-col>
        <v-col :cols="online ? 2 : 12" class="pa-0 text-center">
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                    <v-icon text v-if="timer_pause && online && connect" @click.prevent.stop="timer_pause=!timer_pause">
                        mdi-pause-circle
                    </v-icon>
                    <v-icon
                        v-else-if="!connect"
                        text
                        class="red--text"
                        @click="connect=!connect"
                    >
                        mdi-moon-full
                    </v-icon>
                    <v-icon
                        v-else-if="!loading"
                        text
                        :class="{'red--text': !online, 'green--text': online && connect}"
                        @dblclick="connect=!connect"
                        @click="timer_pause=!timer_pause"
                    >
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
                <span v-if="timer_pause">Project on pause</span>
                <span v-else>Project {{online ? 'online' : 'offline'}}</span>
                <v-divider v-if="track_task_id"></v-divider>
                <span v-if="track_task_id">Task: {{track_task.name}}</span>
            </v-tooltip>
        </v-col>
        <v-col cols="5" class="pa-0" v-if="online">
            <v-row>
                <v-col cols="12" class="pa-0">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <span v-bind="attrs" v-on="on">
                                {{taskCurrentTimeLabel()}}
                            </span>
                        </template>
                        <span>Online task time</span>
                        <v-divider v-if="track_task_id"></v-divider>
                        <span v-if="track_task_id">Task: {{track_task.name}}</span>
                    </v-tooltip>
                </v-col>
                <v-col cols="12" class="pa-0">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <span v-bind="attrs" v-on="on">
                                {{taskCurrentAmountLabel()}} $
                            </span>
                        </template>
                        <span>Online task price</span>
                        <v-divider v-if="track_task_id"></v-divider>
                        <span v-if="track_task_id">Task: {{track_task.name}}</span>
                    </v-tooltip>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
export default {
    props: {},
    data () {
        return {
            loading: !this.$store.state.global.server_url || !this.$store.state.global.server_api_key,
            stop: 60,
            timer: 0,
            events: [],
            moveTime: 0
        }
    },
    mounted() {
        this.runTimer();
        let ioHook = this.$vm.iohook;
        ioHook.on('keydown', () => this.setStop());
        ioHook.on('keyup', () => this.setStop('keyup'));
        ioHook.on('mouseclick', () => this.setStop('mouseclick'));
        ioHook.on('mousedown', () => this.setStop());
        ioHook.on('mouseup', () => this.setStop());
        ioHook.on('mousedrag', () => this.setStop());
        ioHook.on('mousewheel', () => this.setStop('mousewheel'));
        ioHook.on('mousemove', () => this.setStop('mousemove'));
        ioHook.start();
        this.globalEventForUpdate();
    },
    watch: {
    },
    computed: {
        scaffold_hash () {
            return this.$store.state.local.scaffold_hash;
        },
        connect: {
            get () { return this.$store.state.connect},
            set (value) {
                this.globalEventForUpdate();
                this.$store.commit('setState', ['connect', value])
            },
        },
        online: {
            get () { return this.$store.state.local.online},
            set (value) {this.$store.commit('setLocalState', ['online', value])},
        },
        total_seconds: {
            get () { return this.$store.state.local.total_seconds},
            set (value) {this.$store.commit('setLocalState', ['total_seconds', value])},
        },
        timer_speed () {
            return this.$store.state.global.timer_speed;
        },
        rate: {
            get () { return this.$store.state.rate},
            set (value) {this.$store.commit('setState', ['rate', value])},
        },
        timer_pause: {
            get () { return this.$store.state.timer_pause},
            set (value) {
                this.globalEventForUpdate();
                this.$store.commit('setState', ['timer_pause', value])
            },
        },
        track_task_id: {
            get () {return this.$store.state.track_task_id},
            set (value) {this.$store.commit('setState', ['track_task_id', value])},
        },
        task_trackers: {
            get () {return this.$store.state.local.task_trackers},
            set (value) {this.$store.commit('setLocalState', ['task_trackers', value])},
        },
        track_task_pause () {return this.$store.state.track_task_pause},
        task_tracker () {
            return this.$store.state.local.task_trackers[this.track_task_id]
        },
        track_task () {return this.$store.state.track_task},
        server_api_key () {return this.$store.state.global.server_api_key},
        server_url () {return this.$store.state.global.server_url},
    },
    methods: {
        taskCurrentTimeLabel () {
            let tracker = this.$store.state.local.task_trackers[this.track_task_id];
            return this.$vm.help.seconds_to_time(tracker ? tracker.sec : 0)
        },
        taskCurrentAmountLabel () {
            let tracker = this.$store.state.local.task_trackers[this.track_task_id];
            return this.$vm.help.seconds_to_money(
                tracker ? tracker.sec : 0,
                tracker ? tracker.rate : 0
            )
        },
        globalEventForUpdate () {
            this.$vm.server.UpdateTaskList();
        },
        setStop (event = false) {
            this.stop = 60;
            if (event) {
                if (event === 'mousemove' || event === 'mousewheel') {
                    if (this.moveTime) clearTimeout(this.moveTime);
                    this.moveTime = setTimeout(() => {
                        this.$vm.server.SetHook(event, this.track_task_id);
                    }, 50);
                } else {
                    this.$vm.server.SetHook(event, this.track_task_id);
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
            if (this.server_url && this.server_api_key && this.connect) {
                if (this.online) {
                    //if (this.events.length) console.log(this.events);
                    if (this.stop > 0 && !this.timer_pause) {
                        this.$vm.server.AddSecond(this.timer_speed);
                        if (this.track_task_id && !this.track_task_pause) {
                            this.$vm.server.AddTaskSecond(this.track_task_id, this.timer_speed);
                        }
                    }
                    this.$vm.server.ping().then(({data}) => {
                        if (data.data.project_tracker) {
                            this.total_seconds = data.data.project_tracker.sec;
                            this.rate = data.data.project_tracker.rate;
                            if (!this.total_seconds) {
                                this.globalEventForUpdate();
                            }
                        }
                        if (!data.data.scaffold_hash || !this.scaffold_hash) {
                            this.$vm.force_store_scaffold = true;
                            this.changed();
                        }

                        this.loading = false;
                    }).catch(() => {
                        this.online = false;
                    });
                    this.events = [];
                } else {
                    this.loading = true;
                    this.$vm.server.csrf().then(() => {
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
                if (!this.online) this.total_seconds++
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
        },
    }
}
</script>
