module.exports = function () {
    let oldTitle = String(document.head.querySelector('title').innerText).split(" - ")[0];
    document.getElementById('app').classList.remove('hide-window-element');
    document.getElementById('app_loader').classList.add('hide-window-element');
    document.head.querySelector('title').innerText = `${oldTitle} - [${window.$vm.root_dir}]`;
}
