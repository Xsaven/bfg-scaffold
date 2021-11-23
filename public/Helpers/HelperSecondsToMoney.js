module.exports = function (sec, rate) {
    return window.$vm.help.number_format((sec / 3600) * rate, 2, ',', ' ')
}
