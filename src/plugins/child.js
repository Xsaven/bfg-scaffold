export class Child {

    async exec (command) {
        if (localStorage.getItem('php')) {
            command = String(command).replace(/php\b/g, localStorage.getItem('php'))
        }
        if (localStorage.getItem('composer')) {
            command = String(command).replace(/composer\b/g, localStorage.getItem('composer'))
        }
        let cs_fixer = localStorage.getItem('cs_fixer') ? localStorage.getItem('cs_fixer') : './vendor/bin/php-cs-fixer fix';
        if (cs_fixer) {
            command = String(command).replace(/cs_fixer\b/g, cs_fixer)
        }
        let sail = localStorage.getItem('sail') ? localStorage.getItem('sail') : './vendor/bin/sail';
        if (sail) {
            command = String(command).replace(/sail\b/g, sail)
        }
        let out = [];
        return await this.promiseFromChildProcess(window.exec(command, {cwd: window.root_dir}), out);
    }

    promiseFromChildProcess(child, out = []) {
        window.app.clearReport();
        return new Promise(function (resolve, reject) {
            child.addListener("error", reject);
            child.addListener("exit", resolve);
            child.stdout.on("data", (d) => {
                let line = d.trim().split(/\n/g);
                //console.log(line);
                line.map((i) => {
                    console.log(i)
                    window.app.toReport(i);
                });
                out.push(line)
            });
        }).catch((e) => {
            console.error(e);
            process.exit(1);
        });
    }
}
