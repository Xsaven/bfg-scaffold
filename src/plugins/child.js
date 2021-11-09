export class Child {

    async exec (command, out = []) {
        return await this.promiseFromChildProcess(window.exec(command, {cwd: window.root_dir}), out);
    }

    promiseFromChildProcess(child, out = []) {
        return new Promise(function (resolve, reject) {
            child.addListener("error", reject);
            child.addListener("exit", resolve);
            child.stdout.on("data", (d) => {
                let line = d.trim().split(/\n/g);
                //console.log(line);
                line.map((i) => console.log(i));
                out.push(line)
            });
        }).catch((e) => {
            console.error(e);
            process.exit(1);
        });
    }
}
