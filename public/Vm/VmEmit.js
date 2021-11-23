module.exports = function (channel, ...args) {
    return window.$vm.ips.invoke(channel, ...args);
}
