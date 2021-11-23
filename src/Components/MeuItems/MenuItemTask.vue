<template>
    <v-list-item
        @click="edit_task=task; active = ['task', task.id]"
        :class="{'v-list-item--active': active[1] === task.id || task.id === track_task_id}"
        :color="task.id === track_task_id ? 'success' : (task.is_overdue ? 'red' : task.status.color)"
        style="height: 45px"
    >
        <v-list-item-icon v-if="child"></v-list-item-icon>
        <v-tooltip bottom v-else>
            <template v-slot:activator="{ on, attrs }">
                <v-list-item-icon v-bind="attrs" v-on="on" class="mr-4">
                    <v-icon v-if="os.laravel" :color="task.status.color" style="margin-top:-4px;">mdi-laravel</v-icon>
                    <v-icon v-else-if="os.php" :color="task.status.color" style="margin-top:-4px;">mdi-language-php</v-icon>
                    <v-icon v-else-if="os.vuejs" :color="task.status.color" style="margin-top:-4px;">mdi-vuejs</v-icon>
                    <v-icon v-else-if="os.react" :color="task.status.color" style="margin-top:-4px;">mdi-react</v-icon>
                    <v-icon v-else-if="os.angular" :color="task.status.color" style="margin-top:-4px;">mdi-angular</v-icon>
                    <v-icon v-else-if="os.node" :color="task.status.color" style="margin-top:-4px;">mdi-nodejs</v-icon>
                    <v-icon v-else-if="os.git" :color="task.status.color" style="margin-top:-4px;">mdi-git</v-icon>
                    <v-icon v-else :color="task.status.color" style="margin-top:-4px;">mdi-calendar-check</v-icon>
                </v-list-item-icon>
            </template>
            <span>Task: {{task.name}}</span>
            <v-divider />
            <span>Status: {{task.status.name}}</span>
        </v-tooltip>
        <v-list-item-content>
            <v-list-item-title>
                <v-tooltip bottom v-if="task.is_overdue">
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon small color="red" v-bind="attrs" v-on="on">mdi-sort-clock-descending-outline</v-icon>
                    </template>
                    <span>The task is overdue</span>
                </v-tooltip>
                <v-tooltip bottom v-if="child">
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon small :color="task.status.color" :class="{'ml-1': task.is_overdue}" v-bind="attrs" v-on="on">mdi-timeline-text-outline</v-icon>
                    </template>
                    <span>Substitution for the task: {{parent.name}}</span>
                    <v-divider />
                    <span>Status: {{task.status.name}}</span>
                </v-tooltip>
                {{task.name}}
            </v-list-item-title>
            <v-list-item-subtitle>
                {{timeLabel}}
                <span class="rounded green pl-1 pr-1">
                    {{amountLabel}}
                </span>
            </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action v-if="!current">
            <v-tooltip bottom v-if="!track_task_id">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on" @click.stop.prevent="track_task_id=task.id" :disabled="!connect || !online">
                        <v-icon>mdi-play</v-icon>
                    </v-btn>
                </template>
                <span>Run tracker</span>
            </v-tooltip>
            <v-tooltip bottom v-else-if="track_task_id">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on" @click.stop.prevent="dropSelect" v-if="track_task_id===task.id" :disabled="!connect || !online">
                        <v-icon>mdi-pause</v-icon>
                    </v-btn>
                    <v-btn icon v-bind="attrs" v-on="on" @click.stop.prevent="track_task_id=task.id" v-else :disabled="!connect || !online">
                        <v-icon>mdi-play</v-icon>
                    </v-btn>
                </template>
                <span v-if="track_task_id===task.id">
                    <span>Stop tracker</span>
                </span>
                <span v-else>
                    <span>Start tracker</span>
                </span>
            </v-tooltip>
        </v-list-item-action>
        <v-list-item-action v-else>
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on" @click.stop.prevent="track_task_pause=!track_task_pause" :disabled="!connect || !online">
                        <v-icon v-if="!track_task_pause">mdi-pause</v-icon>
                        <v-icon v-else>mdi-play</v-icon>
                    </v-btn>
                </template>
                <span v-if="!track_task_pause">
                    <span>Stop tracker</span>
                </span>
                <span v-else>
                    <span>Start tracker</span>
                </span>
            </v-tooltip>
        </v-list-item-action>
    </v-list-item>
</template>

<script>
export default {
    props: {
        task: {required: true},
        child: {default: false},
        parent: {},
        current: {},
    },
    data () {
        return {
            timeLabel: '00:00:00',
            amountLabel: '0,00 $',
        }
    },
    mounted() {
        this.$vm.server.on(`update-task-tracker-${this.task.id}`, this.updateEvent.bind(this));
        if (this.task.tracker) {
            this.updateEvent({detail: this.task.tracker});
        }
    },
    beforeDestroy() {
        this.$vm.server.off(`update-task-tracker-${this.task.id}`, this.updateEvent.bind(this));
        delete this.$store.state.local.task_trackers[this.task.id];
        this.$store.commit('setLocalState', ['task_trackers', this.task_trackers])
        if (this.track_task_id === this.task.id) this.track_task_id = 0;
    },
    watch: {

    },
    computed: {
        tracker () {
            return this.$store.state.local.task_trackers[this.task.id]
        },
        os () {
            return this.$store.state.local.os
        },
        active: {
            get () {return this.$store.state.selected_model},
            set (value) {this.$store.commit('setSelectedModel', value)},
        },
        edit_task: {
            get () {return this.$store.state.edit_task},
            set (value) {this.$store.commit('setState', ['edit_task', value])},
        },
        track_task_id: {
            get () {return this.$store.state.track_task_id},
            set (value) {
                this.$store.commit('setState', ['track_task', this.task])
                this.$store.commit('setState', ['track_task_id', value])
                if (!value) {
                    delete this.task_trackers[this.task.id];
                }
            },
        },
        track_task_pause: {
            get () {return this.$store.state.track_task_pause},
            set (value) {this.$store.commit('setState', ['track_task_pause', value])},
        },
        task_trackers: {
            get () {return this.$store.state.local.task_trackers},
            set (value) {this.$store.commit('setLocalState', ['task_trackers', value])},
        },
        connect () { return this.$store.state.connect; },
        online () { return this.$store.state.local.online; },
        rate: {
            get () { return this.$store.state.rate},
            set (value) {this.$store.commit('setState', ['rate', value])},
        },
    },
    methods: {
        updateEvent ({detail}) {
            this.amountLabel = this.$vm.help.seconds_to_money(
                detail.sec ? detail.sec : 0,
                detail.rate ? detail.rate : 0
            ) + " $";
            this.timeLabel = this.$vm.help.seconds_to_time(detail ? detail.sec : 0);
            this.task_trackers[this.task.id] = detail;
        },
        dropSelect () {
            this.track_task_id=0;
        }
    }
}
</script>
