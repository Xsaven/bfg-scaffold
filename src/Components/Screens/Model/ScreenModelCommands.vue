<template>
    <v-container ref="s">
        <v-row>
            <v-col cols="6">
                <v-subheader>Global</v-subheader>
                <v-chip-group column>
                    <c-action-cmd-chip name="Up" cmd="php artisan up" title="Bring the application out of maintenance mode" />
                    <c-action-cmd-chip name="Down" cmd="php artisan down" title="Put the application into maintenance / demo mode" />
                    <c-action-cmd-chip name="Routs" cmd="php artisan route:list --columns=name,uri,method,action" title="List all registered routes" />
                    <c-action-cmd-chip name="Key Generate" cmd="php artisan key:generate" title="Set the application key" />
                </v-chip-group>
                <v-subheader>Make</v-subheader>
                <v-chip-group column>
                    <c-action-cmd-chip name="Controller" cmd="php artisan make:controller {model}Controller" title="Create a new controller class" />
                    <c-action-cmd-chip name="Jax" cmd="php artisan make:jax {model}" title="Make blank Jax executor" />
                    <c-action-cmd-chip name="Job" cmd="php artisan make:job {model}Job" title="Create a new job class" />
                    <c-action-cmd-chip name="Js Executor" cmd="php artisan make:js-executor {model}" title="Make blank js executor" />
                    <c-action-cmd-chip name="Layout" cmd="php artisan make:layout {model}" title="Make lar layout" />
                    <c-action-cmd-chip name="Mail" cmd="php artisan make:mail {model}Mail" title="Create a new email class" />
                    <c-action-cmd-chip name="Middleware" cmd="php artisan make:middleware {model}Middleware" title="Create a new middleware class" />
                    <c-action-cmd-chip name="Migration" cmd="php artisan make:migration update_table_{name} --table={name}" title="Create a new migration file" />
                    <c-action-cmd-chip name="Notification" cmd="php artisan make:notification {model}Notification" title="Create a new notification class" />
                    <c-action-cmd-chip name="Observer" cmd="php artisan make:observer {model}Observer -m {model}" title="Create a new observer class" />
                    <c-action-cmd-chip name="Policy" cmd="php artisan make:policy {model}Policy -m {model}" title="Create a new policy class" />
                    <c-action-cmd-chip name="ServiceProvider" cmd="php artisan make:provider {model}ServiceProvider" title="Create a new service provider class" />
                    <c-action-cmd-chip name="Repository" cmd="php artisan make:repository {model}Repository -m {model}" title="Create a new Repository for Eloquent model class" />
                    <c-action-cmd-chip name="Request" cmd="php artisan make:request {model}Request" title="Create a new form request class" />
                    <c-action-cmd-chip name="Resource" cmd="php artisan make:resource {model}Resource -m {model}" title="Create a new resource" />
                    <c-action-cmd-chip name="Rule" cmd="php artisan make:rule {model}Rule" title="Create a new validation rule" />
                    <c-action-cmd-chip name="Seeder" cmd="php artisan make:seeder {model}Seeder" title="Create a new seeder class" />
                    <c-action-cmd-chip name="Tag" cmd="php artisan make:tag {model}" title="Make lar component" />
                    <c-action-cmd-chip name="Vue" cmd="php artisan make:vue {model} v-{name}" title="Make lar-vue component" />
                    <c-action-cmd-chip name="Bench" cmd="php artisan make:bench {model}" title="Speed test maker" />
                    <c-action-cmd-chip name="Cast" cmd="php artisan make:cast {model}Cast" title="Create a new custom Eloquent cast class" />
                    <c-action-cmd-chip name="Channel" cmd="php artisan make:channel {model}Channel" title="Create a new channel class" />
                    <c-action-cmd-chip name="Command" cmd="php artisan make:command {model}Command --command={name}" title="Create a new Artisan command" />
                    <c-action-cmd-chip name="Component" cmd="php artisan make:component {model}Component" title="Create a new view component class" />
                    <c-action-cmd-chip name="Event" cmd="php artisan make:event {model}Event" title="Create a new event class" />
                    <c-action-cmd-chip name="Exception" cmd="php artisan make:exception {model}Exception" title="Create a new custom exception class" />
                    <c-action-cmd-chip name="Factory" cmd="php artisan make:factory {model}Factory -m {model}" title="Create a new model factory" />
                </v-chip-group>
                <v-subheader>Cache</v-subheader>
                <v-chip-group column>
                    <c-action-cmd-chip name="Clear" cmd="php artisan cache:clear" title="Flush the application cache" />
                    <c-action-cmd-chip name="Forget" cmd="php artisan cache:forget" title="Remove an item from the cache" />
                    <c-action-cmd-chip name="Config Cache" cmd="php artisan config:cache" title="Create a cache file for faster configuration loading" />
                    <c-action-cmd-chip name="Config Cache Clear" cmd="php artisan config:clear" title="Remove the configuration cache file" />
                    <c-action-cmd-chip name="Event Cache" cmd="php artisan event:cache" title="Discover and cache the application's events and listeners" />
                    <c-action-cmd-chip name="Event Cache Clear" cmd="php artisan event:clear" title="Clear all cached events and listeners" />
                    <c-action-cmd-chip name="Route Cache" cmd="php artisan route:cache" title="Create a route cache file for faster route registration" />
                    <c-action-cmd-chip name="Route Cache Clear" cmd="php artisan route:clear" title="Remove the route cache file" />
                    <c-action-cmd-chip name="View Cache" cmd="php artisan view:cache" title="Compile all of the application's Blade template" />
                    <c-action-cmd-chip name="View Cache Clear" cmd="php artisan view:clear" title="Compile all of the application's Blade template" />
                    <c-action-cmd-chip name="Optimize Cache Clear" cmd="php artisan optimize:clear" title="Remove the cached bootstrap files" />
                </v-chip-group>
            </v-col>
            <v-col cols="6">
                <v-subheader>Schedule</v-subheader>
                <v-chip-group column>
                    <c-action-cmd-chip name="List" cmd="php artisan schedule:list" title="List the scheduled commands" />
                    <c-action-cmd-chip name="Run" cmd="php artisan schedule:run" title="Run the scheduled commands" />
                    <c-action-cmd-chip name="Test" cmd="php artisan schedule:test" title="Run a scheduled command" />
                </v-chip-group>
                <v-subheader>Lte Admin</v-subheader>
                <v-chip-group column>
                    <c-action-cmd-chip name="Install" cmd="php artisan lte:install -f" title="Install or update admin LTE" />
                    <c-action-cmd-chip name="Controller" cmd="php artisan lte:controller {model} -m {model}" title="Make Admin LTE Controller" />
                    <c-action-cmd-chip name="Modal" cmd="php artisan lte:jax {model}" title="Make lte modal" />
                    <c-action-cmd-chip name="Jax" cmd="php artisan lte:jax Lte{model}" title="Make lte jax" />
<!--                    <c-action-cmd-chip name="Seed Pull" cmd="php artisan seed:pull {model}" title="Pull model to seed class" />-->
                </v-chip-group>
                <v-subheader>Database</v-subheader>
                <v-chip-group column>
                    <c-action-cmd-chip name="Migrate" cmd="php artisan migrate" title="Run the database migrations" />
                    <c-action-cmd-chip name="Migrate, Seed" cmd="php artisan migrate --seed" title="Run the database migrations and Seed the database with records" />
                    <c-action-cmd-chip name="Migrate Fresh" cmd="php artisan migrate:fresh" title="Drop all tables and re-run all migrations" />
                    <c-action-cmd-chip name="Migrate Fresh, Seed" cmd="php artisan migrate:fresh --seed" title="Drop all tables and re-run all migrations and Seed the database with records" />
                    <c-action-cmd-chip name="Seed" cmd="php artisan db:seed" title="Seed the database with records" />
                </v-chip-group>
                <v-subheader>Event</v-subheader>
                <v-chip-group column>
                    <c-action-cmd-chip name="Generate" cmd="php artisan event:generate" title="Generate the missing events and listeners based on registration" />
                    <c-action-cmd-chip name="List" cmd="php artisan event:list" title="List the application's events and listeners" />
                </v-chip-group>
                <v-subheader>IDE-Helper</v-subheader>
                <v-chip-group column>
                    <c-action-cmd-chip name="Eloquent" cmd="php artisan ide-helper:eloquent" title="Add Eloquent helper to EloquentModel" />
                    <c-action-cmd-chip name="Generate" cmd="php artisan ide-helper:generate" title="Generate a new IDE Helper file" />
                    <c-action-cmd-chip name="Meta" cmd="php artisan ide-helper:meta" title="Generate metadata for PhpStorm" />
                    <c-action-cmd-chip name="Models" cmd="php artisan ide-helper:models --write" title="Generate autocompletion for models" />
                </v-chip-group>
            </v-col>
        </v-row>

        <v-subheader>Publishes</v-subheader>
        <v-chip-group column>
            <c-action-cmd-chip name="Fortify Config" cmd="php artisan vendor:publish --tag=fortify-config" title="Publish fortify config" :help="false" />
            <c-action-cmd-chip name="Fortify Migrations" cmd="php artisan vendor:publish --tag=fortify-migrations" title="Publish fortify migrations" :help="false" />
            <c-action-cmd-chip name="Fortify Support" cmd="php artisan vendor:publish --tag=fortify-support" title="Publish fortify support" :help="false" />
            <c-action-cmd-chip name="Lar Layout Config" cmd="php artisan vendor:publish --tag=lar-layout-config" title="Publish lar layout config" :help="false" />
            <c-action-cmd-chip name="Lar WS" cmd="php artisan vendor:publish --tag=lar-lar-ws" title="Publish lar ws" :help="false" />
            <c-action-cmd-chip name="Laravel Errors" cmd="php artisan vendor:publish --tag=laravel-errors" title="Publish laravel errors" :help="false" />
            <c-action-cmd-chip name="Laravel Mail" cmd="php artisan vendor:publish --tag=laravel-mail" title="Publish laravel mail" :help="false" />
            <c-action-cmd-chip name="Laravel Notifications" cmd="php artisan vendor:publish --tag=laravel-notifications" title="Publish laravel notifications" :help="false" />
            <c-action-cmd-chip name="Laravel Pagination" cmd="php artisan vendor:publish --tag=laravel-pagination" title="Publish laravel pagination" :help="false" />
            <c-action-cmd-chip name="LJS Assets" cmd="php artisan vendor:publish --tag=ljs-assets" title="Publish ljs assets" :help="false" />
            <c-action-cmd-chip name="AdminLte Assets" cmd="php artisan vendor:publish --tag=lte-adminlte-assets" title="Publish adminlte assets" :help="false" />
            <c-action-cmd-chip name="Lte Assets" cmd="php artisan vendor:publish --tag=lte-assets" title="Publish lte assets" :help="false" />
            <c-action-cmd-chip name="Lte Config" cmd="php artisan vendor:publish --tag=lte-config" title="Publish lte config" :help="false" />
            <c-action-cmd-chip name="Lte Html" cmd="php artisan vendor:publish --tag=lte-html" title="Publish lte html" :help="false" />
            <c-action-cmd-chip name="Lte Language" cmd="php artisan vendor:publish --tag=lte-lang" title="Publish lte lang" :help="false" />
            <c-action-cmd-chip name="Lte Migrations" cmd="php artisan vendor:publish --tag=lte-migrations" title="Publish lte migrations" :help="false" />
            <c-action-cmd-chip name="Sail" cmd="php artisan vendor:publish --tag=sail" title="Publish sail" :help="false" />
            <c-action-cmd-chip name="Sail Bin" cmd="php artisan vendor:publish --tag=sail-bin" title="Publish sail bin" :help="false" />
            <c-action-cmd-chip name="Sail Docker" cmd="php artisan vendor:publish --tag=sail-docker" title="Publish sail docker" :help="false" />
            <c-action-cmd-chip name="Sanctum Config" cmd="php artisan vendor:publish --tag=sanctum-config" title="Publish sanctum config" :help="false" />
            <c-action-cmd-chip name="Sanctum Migrations" cmd="php artisan vendor:publish --tag=sanctum-migrations" title="Publish sanctum migrations" :help="false" />
        </v-chip-group>

        <v-container fluid>
            <br><br>
            <v-divider v-if="$store.state.cmd"></v-divider>
            <code v-if="$store.state.cmd">{{$store.state.cmd}}</code>
            <v-divider v-if="$store.state.cmd"></v-divider>
            <v-row>
                <v-col><pre><template v-for="(s) in last_child_report">
{{s}}</template></pre></v-col>
            </v-row>
        </v-container>
    </v-container>
</template>

<script>
export default {
    data () {
        return {
            t: 0
        }
    },
    watch: {
        last_child_report () {
            if (this.t) clearTimeout(this.t);
            this.t = setTimeout(() => document.querySelector('.container_statistic').scrollTop = 999999999999999999999999, 100)
        }
    },
    computed: {
        model () {
            return this.$store.getters.model
        },
        last_child_report: {
            get () { return this.$store.state.temp.last_child_report; },
            set (val) { this.$store.commit('setLastChildReport',['last_child_report', val]); }
        },
        cmd: {
            get () {return this.$store.state.cmd},
            set (val) {return this.$store.commit('setCmd', val)},
        },

    },
    methods: {
        s (cmd, r = false) {
            window.cmd.set(cmd, r);
        }
    }
}
</script>
