let last_child_report = [];

module.exports = class Child {

    async exec (command) {
        let out = [];
        return await this.promiseFromChildProcess(
            window.$vm.exec(
                this.commandReplacer(
                    command
                ), {cwd: window.$vm.root_dir}
            ), out
        );
    }

    commandReplacer (cmd = "", cmdList = {}) {
        cmdList = window.$vm.lodash.merge({
            cs_fixer: window.$vm.$store.state.global.cs_fixer_path,
            composer: window.$vm.$store.state.global.composer_path,
            php: window.$vm.$store.state.global.php_path,
        }, window.$vm.$store.state.global.program_paths, cmdList);
        window.$vm.lodash.map(cmdList, (toCmd, fromCmd) => {
            if (!toCmd) return;
            fromCmd = String(fromCmd).replace(/\s/g, '\\s')
                .replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\#-]', 'g'), '\\$&');
            cmd = String(cmd)
                .replace(new RegExp(`^${fromCmd}$`), toCmd)
                .replace(new RegExp(`^${fromCmd}\\s`), `${toCmd} `)
                .replace(new RegExp(`\\s${fromCmd}$`), ` ${toCmd}`)
                .replace(new RegExp(`\\s${fromCmd}\\s`, 'g'), ` ${toCmd} `);
        });
        return cmd;
    }

    promiseFromChildProcess(child, out = []) {
        last_child_report = []
        window.$vm.$store.commit('setTempState', ['last_child_report', []]);
        return new Promise(function (resolve, reject) {
            child.addListener("error", reject);
            child.addListener("exit", resolve);
            child.stdout.on("data", (d) => {
                let line = d.trim().split(/\n/g);
                line.map((i) => {
                    last_child_report.push(i)
                    window.$vm.$store.commit('setTempState', ['last_child_report', last_child_report]);
                });
                out.push(line)
            });
        }).catch((e) => {
            console.error(e);
            process.exit(1);
        });
    }
}
