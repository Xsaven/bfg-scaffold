module.exports = function () {
    let app = document.getElementById('app');
    let app_loader = document.getElementById('app_loader');
    let oldTitle = String(document.head.querySelector('title').innerText).split(" - ")[0];
    if (!app_loader) {
        document.body.prepend(
            window.$vm.help.generate_loading_element()
        );
    }
    if (app) {
        app.classList.add('hide-window-element');
    }
    document.getElementById('app_loader').classList.remove('hide-window-element');
    document.head.querySelector('title').innerText = `${oldTitle} - Loading...`;
}
