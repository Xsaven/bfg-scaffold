module.exports = function (channel, listener) {
    return window.$vm.ips.removeListener(channel, listener);
}
