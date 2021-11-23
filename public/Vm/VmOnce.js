module.exports = function (channel, listener) {
    return window.$vm.ips.on(channel, listener);
}
